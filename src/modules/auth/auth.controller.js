import { sendError } from "../../utils/AppError.js";
import { sendSuccess } from "../../utils/apiResponse.js";
import { registerUser,  loginUser } from "./auth.service.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const registerUsersController = async (req, res, next) => {
  try {
    const { name, email, password ,username} = req.body;

    if (!name || !email || !password||!username) {
      return sendError(res, 400, "Name, email ,username and password are required");
    }

    if (email.includes("  ")) {
      return sendError(res, 400, "Email must not contain spaces");
    }

    const normalizeEmail = email.trim().toLowerCase();
    if (!normalizeEmail) {
      return sendError(res, 400, "Please provide a valid email");
    }

    const existingEmail = await loginUser(normalizeEmail);
    if (existingEmail) {
      return sendError(res, 409, "Email already exists");
    }

    if (password.length < 8) {
      return sendError(res, 400, "Password must be at least 8 characters");
    }

    const hashedPassword = await argon2.hash(password);

    const user = await registerUser({
      name,
      username,
      email: normalizeEmail,
      password: hashedPassword,
    });

    const { password: _password, ...safeUser } = user;

    return sendSuccess(res, 201, "User registered successfully", safeUser);
  } catch (error) {
    next(error);
  }
};
export const loginController=async(req,res,next)=>{
    try{
        const {email,password}=req.body
        if(!email||!password){
            return sendError(res,400,"email and password are required ")
        }
        const normalizeEmail=email.trim().toLowerCase()
        const user = await loginUser(email)
        if(!user){
            return sendError(res,400,"Inavlid email and password")
        }

    const isPasswordValid = await argon2.verify(
      user.password,
      password
    );

    if (!isPasswordValid) {
      return sendError(res, 401, "Invalid email or password");
    }
     const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
     res.cookie("access_token", token, { });
        const { password: _password, ...safeUser } = user;

    return sendSuccess(
      res,
      200,
      "Login successful",
      safeUser
    );
  } catch (error) {
    next(error);
  }
};
    
export const logoutController = async (req, res, next) => {
  try {
    res.clearCookie("access_token");  
    return sendSuccess(res, 200, "Logout successful", null);}
    catch (error) {
      next(error);
    }
}