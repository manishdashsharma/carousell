import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
    trim: true,
    maxLength: [120, "Prouct name should not exceed 120 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"],
    maxLength: [50, "Product price should not exceed 50 digits"],
  },
  condition: {
    type: String
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

export default mongoose.model("Product", productSchema);