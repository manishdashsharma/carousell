import SubCategory from '../models/subCategory.schema.js';
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/CustomError.js'


export const createSubCategory = asyncHandler( async(req, res) => {
    const { name, categoryId } = req.body

    if (!name || !categoryId) {
        throw new CustomError('Provide category name and subcategory name', 404)
    }

    const subCategory = await SubCategory.create({
        name,
        categoryId
    })

    res.status(200).json({
        success: true,
        message: 'SubCategory created successfully',
        subCategory
    })
})

export const allSubCategory = asyncHandler( async(req, res) => {
    const subCategory = await SubCategory.find()

    if (!subCategory) {
        throw new CustomError('SubCategory not found', 404)
    }

    res.status(200).json({
        success: true,
        message: 'List of SubCategory',
        subCategory
    })
})

export const updateSubCategory = asyncHandler( async (req,res) =>{
    const { name } = req.body
    const { id: subCategoryId } = req.params;
  
    if (!name) {
        throw new CustomError("Category name is required", 400);
    }
    
    let updatedCategory = await SubCategory.findByIdAndUpdate(
        subCategoryId,{ name },
        {
            new: true,
            runValidators: true,
        }
    );
  
    res.status(200).json({
        success: true,
        message: 'SubCategory name updated successfully',
        updatedCategory
    })
})

export const deleteSubCategory = asyncHandler( async (req,res) => {
    const { id: subCategoryId } = req.params
    
    const CategoryToDelete = await SubCategory.findByIdAndDelete(subCategoryId)
  
    if(!subCategoryId) {
        throw new CustomError('Sub Category not found',404)
    }
    res.status(200).json({
        success: true,
        message: 'Sub Category deleted successfully'
    })
})

export const signleSubCategory = asyncHandler( async (req,res) => {
    const { id: subCategoryId } = req.params

    const subCategory = await SubCategory.findById(subCategoryId)

    if(!subCategory) {
        throw new CustomError('Category not found',404)
    }

    res.status(200).json({
        success: true,
        subCategory
    })
})

export const getSubCategoryByCategoryId = asyncHandler( async (req,res) => {
    const { id: categoryId } = req.params

    if(!categoryId) {
        throw new CustomError('Provide catagory ID',404)
    }

    const subCategory = await SubCategory.find({categoryId})

    if(!subCategory) {
        throw new CustomError('Category not found ok',404)
    }

    res.status(200).json({
        success: true,
        message: "List of sub categories based on category ID",
        subCategory
    })
})