import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name : {
      type: String,
      required: [true, "Provide a category name"],
      trim: true,
      maxLength: [120, "Category shouldnot exceed 120 characters"],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
  },
  { timestamps: true }
);


export default mongoose.model('SubCategory', subCategorySchema)