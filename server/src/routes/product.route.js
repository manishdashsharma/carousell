import { Router } from "express";
import {  isLoggedIn , authorize } from "../middlewares/auth.middleware.js";
import { addProduct, getProduct, getProductById } from "../controllers/product.controller.js";

const router = Router()

router.post("/", addProduct);
router.get("/", getProduct);
router.get("/:id", getProductById);



export default router;