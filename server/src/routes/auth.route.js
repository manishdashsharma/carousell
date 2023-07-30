import { Router } from "express";
import { getProfile, login, logout, signUp, forgotPassword, resetPassword,addUserAddress } from "../controllers/auth.controller.js";
import {  isLoggedIn , authorize } from "../middlewares/auth.middleware.js";


const router = Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/logout", logout)
router.get("/profile", isLoggedIn, getProfile)
router.post("/password/forgot", forgotPassword)
router.post("/password/reset/:token", resetPassword)
router.put("/address", isLoggedIn, addUserAddress)


export default router;