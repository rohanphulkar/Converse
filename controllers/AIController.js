import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import streamifier from "streamifier";
import { AI } from "../models/AIModel.js";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getData = async (req, res) => {
  try {
    const data = await AI.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to fetch data.");
  }
};

export async function addData(req, res) {
  try {
    const { name, email, prompt, response } = req.body;
    if (!name || !email || !prompt || !response) {
      return res.status(400).send("Missing required fields.");
    }

    const handleSaveAI = async (image = "") => {
      const ai = new AI({
        name,
        email,
        prompt,
        response,
        image,
      });
      await ai.save();
      return res.status(201).json({ message: "Data added successfully." });
    };

    if (req.file) {
      const file = req.file;

      if (!file) {
        return res.status(400).send("No file uploaded.");
      }

      let stream = cloudinary.uploader.upload_stream(async (error, result) => {
        if (error) {
          return res.status(500).send("Failed to upload to Cloudinary.");
        }
        await handleSaveAI(result.secure_url);
      });

      streamifier.createReadStream(file.buffer).pipe(stream);
    } else {
      await handleSaveAI();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export async function deleteData(req, res) {
  try {
    const id = req.params.id;
    const ai = await AI.findByIdAndDelete(id);
    if (!ai) {
      return res.status(404).send("Data not found.");
    }
    res.status(200).json({ message: "Data deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
