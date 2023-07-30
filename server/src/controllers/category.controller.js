import Category from '../models/category.schema.js';
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/CustomError.js'


export const createCategory = asyncHandler( async(req, res) => {
    const { name } = req.body

    if (!name ) {
        throw new CustomError('Provide category name and subcategory name', 404)
    }

    const category = await Category.create({
        name
    })

    res.status(200).json({
        success: true,
        message: 'Category created successfully',
        category
    })
})

export const category = asyncHandler( async(req, res) => {
    const category = await Category.find()

    if (!category) {
        throw new CustomError('Category not found', 404)
    }

    res.status(200).json({
        success: true,
        message: 'List of categories',
        category
    })
})

export const updateCategory = asyncHandler( async (req,res) =>{
    const { name } = req.body
    const { id: CategoryId } = req.params;
  
    if (!name) {
        throw new CustomError("Category name is required", 400);
    }
    
    let updatedCategory = await Category.findByIdAndUpdate(
        CategoryId,{ name },
        {
            new: true,
            runValidators: true,
        }
    );
  
    res.status(200).json({
        success: true,
        message: 'Category name updated successfully',
        updatedCategory
    })
})

export const deleteCategory = asyncHandler( async (req,res) => {
    const { id: CategoryId } = req.params
    
    const CategoryToDelete = await Category.findByIdAndDelete(CategoryId)
  
    if(!CategoryId) {
        throw new CustomError('Category not found',404)
    }
    res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
    })
})

export const signleCategory = asyncHandler( async (req,res) => {
    const { id: CategoryId } = req.params

    const category = await Category.findById(CategoryId)
   
    if(!category) {
        throw new CustomError('Category not found',404)
    }

    res.status(200).json({
        success: true,
        category
    })
})