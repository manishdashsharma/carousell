import Product from "../models/product.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";
import formidable from 'formidable';
import cloudinary from "../config/cloudinary.config.js";
import config from './../config/index.js';
import mongoose from "mongoose";


export const addProduct = asyncHandler((req, res) => {
    const form = formidable({ multiples: true, keepExtensions: true });
  
    form.parse(req, async function (error, fields, files) {
      if (error) {
        throw new CustomError(error.message || "Something went wrong", 500);
      }
  
      let carCategoryId = new mongoose.Types.ObjectId().toHexString();
  
      if (
        !fields.name[0] ||
        !fields.price[0] ||
        !fields.condition[0] ||
        !fields.description[0] ||
        !fields.categoryId[0] ||
        !fields.subcategoryId[0] ||
        !fields.other[0]
      ) {
        throw new CustomError("Please provide all details", 400);
      }

      const name= fields.name[0] 
      const price= fields.price[0] 
      const condition= fields.condition[0] 
      const description= fields.description[0]
      const categoryId  = fields.categoryId[0] 
      const subcategoryId=  fields.subcategoryId[0]
      const other=  JSON.parse(fields.other[0])


      let imageUpload = [];
  
      for (const filekey in files) {
        const file = files[filekey];
        const upload = await cloudinary.v2.uploader.upload(file[0].filepath, {
          folder: config.CarFolderName
        });
        imageUpload.push({
          secure_url: upload.secure_url,
          public_id: upload.public_id
        });
      }
    
      const product = await Product.create({
        _id: carCategoryId,
        photos: imageUpload,
        name ,
        condition,
        price ,
        description ,
        categoryId,
        subcategoryId,
        other
      });
  
      if (!product) {
        throw new CustomError('Failed to add product', 400);
      }
  
      res.status(200).json({
        success: true,
        product
      });
    });
});

export const getProductById = asyncHandler(async (req, res) => {
  const {id: productId} = req.params

  const product = await Product.findById(productId)

  if (!product) {
      throw new CustomError("No product found", 404)
  }

  res.status(200).json({
      success: true,
      product
  })
});

export const getProduct = asyncHandler(async(req, res) => {
  const product = await Product.find()

  if(!product) {
    throw new CustomError("No product found", 404)
  }

  res.status(200).json({
    success: true,
    product
  })
});