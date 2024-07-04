import mongoose from "mongoose";

// Define the schema
const AISchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  response: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create the model
export const AI = mongoose.model("AI", AISchema);
