import User from "../models/auth.schema.js"
import JWT from "jsonwebtoken"
import asyncHandler from "../services/asyncHandler.js"
import config from "../config/index.js"
import CustomError from "../services/CustomError.js"


export const isLoggedIn = asyncHandler(async (req, res, next) => {
    let token;
  
    if (req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
      token = req.cookies.token ? req.cookies.token : req.headers.authorization.split(" ")[1];
    }
    
    if (!token) {
      throw new CustomError("Not authorized to access this resource", 401);
    }
    
    try {
      const decodedJWTPayload = JWT.verify(token, config.JWT_SECRET);
      req.user = await User.findById(decodedJWTPayload._id, "name email role phoneNumber address city");
      next();
    } catch (error) {
      throw new CustomError("Not authorized to access this resource", 401);
    }
  });

export const authorize = (...requiredRoles) => asyncHandler( async (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
        throw new CustomError("You are not authorized to access this resource")
    }
    next()
})