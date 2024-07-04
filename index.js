import { config } from "dotenv";
config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import AIRoutes from "./routes/AIRoutes.js";
import path from "path";
import { connectDB } from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/public"));

app.use(cors());

connectDB();

app.use("/", AIRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
