import { Router } from "express";
import {  isLoggedIn , authorize } from "../middlewares/auth.middleware.js";
import { addCarCategory, getCarCategory, getCarCategoryId, addFavorite } from "../controllers/car.category.controller.js";

const router = Router()

router.get("/", getCarCategory);
router.get("/:id", getCarCategoryId);
router.post("/",isLoggedIn, addCarCategory);
router.put("/:id",isLoggedIn, addFavorite);



export default router;