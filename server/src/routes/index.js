import { Router } from "express";
import authRoutes from "./auth.route.js"
import category from "./category.route.js"
import subcategory from "./subCategory.route.js"
import carCategory from "./carCategory.route.js";

const router = Router()

router.use("/auth", authRoutes)
router.use("/category", category)
router.use("/subcategory", subcategory)
router.use("/carcategories", carCategory)

export default router