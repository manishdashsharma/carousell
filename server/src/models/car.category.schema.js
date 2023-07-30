import mongoose from "mongoose";

const carCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a car name"],
    trim: true,
    maxLength: [120, "Car name should not exceed 120 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a car price"],
    maxLength: [50, "Car price should not exceed 50 digits"],
  },
  description: {
    type: String,
  },
  photos: [
    {
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  sold: {
    type: Boolean,
    default: false,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  other: {
    type: mongoose.Schema.Types.Mixed,
  },
  favorites: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export default mongoose.model("CarCategory", carCategorySchema);
