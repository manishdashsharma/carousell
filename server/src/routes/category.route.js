import { Router } from "express";
import {  isLoggedIn , authorize } from "../middlewares/auth.middleware.js";
import { createCategory,updateCategory,category, deleteCategory, signleCategory } from "../controllers/category.controller.js";

const router = Router()

router.get("/", category)
router.post("/",isLoggedIn, createCategory)
router.put("/:id",isLoggedIn, updateCategory)
router.get("/:id", signleCategory)
router.delete("/:id",isLoggedIn, deleteCategory)


export default router;