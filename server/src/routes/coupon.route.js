import { Router } from "express";
import { createCoupon, deleteCoupon, disableCoupon, updateCouponDiscount, getAllCoupons, getAllActiveCoupon } from "../controllers/coupon.controller.js";
import {  isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRole.js";

const router = Router()

router.post('/', isLoggedIn , createCoupon)
router.get("/", isLoggedIn, getAllCoupons)
router.put("/:id", isLoggedIn , updateCouponDiscount)
router.delete("/:id", isLoggedIn, deleteCoupon)
router.get("/get-active-coupon", getAllActiveCoupon);
router.put("/disable-coupon/:id", disableCoupon);


export default router