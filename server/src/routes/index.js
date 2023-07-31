import { Router } from "express";
import authRoutes from "./auth.route.js"
import category from "./category.route.js"
import subcategory from "./subCategory.route.js"
import couponRoute from "./coupon.route.js";
import productRoute from "./product.route.js";

const router = Router()

router.use("/auth", authRoutes)
router.use("/category", category)
router.use("/subcategory", subcategory)
router.use("/coupon", couponRoute)
router.use("/product", productRoute)

export default router