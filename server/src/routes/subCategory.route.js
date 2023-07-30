import { Router } from "express";
import {  isLoggedIn , authorize } from "../middlewares/auth.middleware.js";
import { createSubCategory, allSubCategory, updateSubCategory, deleteSubCategory, signleSubCategory, getSubCategoryByCategoryId  } from "../controllers/subCategory.controller.js"

const router = Router()

router.get("/", allSubCategory)
router.get("/:id", signleSubCategory)
router.get("/sub-category/:id", getSubCategoryByCategoryId)
router.post("/",isLoggedIn, createSubCategory)
router.put("/:id",isLoggedIn, updateSubCategory)
router.delete("/:id",isLoggedIn, deleteSubCategory)


export default router;