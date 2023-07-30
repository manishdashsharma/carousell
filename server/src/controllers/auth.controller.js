import User from '../models/auth.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/CustomError.js'
import mailHelper from '../services/mailHelper.js'
import crypto from "crypto"


export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, role, phoneNumber, address,city } = req.body;

  if (!name || !email || !password || !phoneNumber || !city) {
      throw new CustomError("Please add all fields", 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
      throw new CustomError("User already exists", 200);
  }

  const user = await User.create({
      name,
      email,
      password,
      role,
      phoneNumber,
      address,
      city
  });

  const token = user.getJWTtoken();
  user.password = undefined;

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
      success: true,
      token,
      user,
  });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError("Please provide email or password");
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new CustomError("Invalid user", 404);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (isPasswordMatched) {
        const token = await user.getJWTtoken();
        user.password = undefined;
        res.cookie("token", token, cookieOptions);
        res.status(200).json({
            success: true,
            token,
            user
        });
    } else {
        throw new CustomError("Password does not match!", 400);
    }
});

export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})

export const getProfile = asyncHandler( async(req, res) => {
    const {user} = req

    if(!user){
        throw new CustomError("User not found",401)
    }

    res.status(200).json({
        success: true,
        user
    })

})

export const forgotPassword = asyncHandler( async (req, res) => {
    const { email } = req.body
    if(!email){
        throw new CustomError("Email not found",404)
    }
    const user = await User.findOne({ email })
    if(!user){
        throw new CustomError("User not found", 404)
    }
    const resetToken = user.generateForgotPasswordToken();
    await user.save({ 
        validateBeforeSave: false 
    });
    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/password/reset/${resetToken}`;

    // frontend routes
    // const forgot_password_url = `${frontend_url}/api/v1/auth/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf this request was not made by you, please ignore this email.`;
    try {
        const option = {
          email: user.email,
          subject: "Password reset mail",
          message,
        };
        await mailHelper(option);
        
        res.status(200).json({
            success: true,
            message: "Check your mail to your email address.",
            resetUrl
        });
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save({ validateBeforeSave: false });

        throw new CustomError(error.message || "Email could not be sent", 500);
    }

})

export const resetPassword = asyncHandler(async (req, res) => {
    const { token: resetToken } = req.params;
    const { password, confirmPassword } = req.body;
  
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    const user = await User.findOne({
      forgotPasswordToken: resetPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });
  
    if (!user) {
      throw new CustomError("Password reset token is invalid or expired", 400);
    }
  
    if (password !== confirmPassword) {
      throw new CustomError("Passwords do not match", 400);
    }
  
    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
  
    await user.save();
    user.password = undefined;
    const token = user.getJWTtoken();
    res.cookie("token", token, cookieOptions);
  
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user
    });
});

export const addUserAddress = asyncHandler( async (req, res) => {
    const { user : userinfo } = req
    const { address } = req.body
    if(!userinfo) {
      new CustomError("User not found",404)
    }
    const user = await User.findByIdAndUpdate(
      userinfo._id, { address } ,
      {
        new: true,
        runValidators: true,
      }
    )
    if (!user) {
      new CustomError("User info could not update",400)
    }
    res.status(200).json({
      success: true,
      message: "User address added successfully",
      user
    })
})