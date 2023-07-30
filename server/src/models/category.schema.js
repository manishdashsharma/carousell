import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide a category name"],
      trim: true,
      maxLength: [120, "Category shouldnot exceed 120 characters"],
    }
  },
  { timestamps: true }
);


export default mongoose.model('Category', categorySchema)