
import {
  getUserById,
  updateUserName,
  updatePassword
} from "./user.service.js";

import argon2 from "argon2";
import { sendSuccess } from "../../utils/apiResponse.js";
import { sendError } from "../../utils/AppError.js";

export const getMyProfileController = async (req, res) => {
  const user = await getUserById(req.user.id);

  if (!user) {
   return sendError(res,404,"Not Found")
  }

  const { password, ...safeUser } = user;

  return sendSuccess(res, 200, "Profile fetched", safeUser);
};

export const updateMyProfileController = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return sendError(res,400," Name is required")
   
  }

  const user = await updateUserName(req.user.id, name.trim());
  const { password, ...safeUser } = user;

  return sendSuccess(res, 200, "Name updated", safeUser);
};

export const updateMyPasswordController = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return sendError(res,400,"All password fields are  required")
  }

  if (newPassword.length < 8) {
    return sendError(res,400,"password  must be at least 8 caharacters ")
  }

  if (newPassword !== confirmPassword) {
    return sendError(res,400,"password do not match ")
  }

  const user = await getUserById(req.user.id);

  if (!user) {
    return sendError(res,404,"User Not found ")
  }

  const isValid = await argon2.verify(user.password, currentPassword);

  if (!isValid) {
    return sendError( res,401, "Current password is incorrect");
  }

  await updatePassword(req.user.id, newPassword);

  return sendSuccess(res, 200, "Password updated successfully", null);
};
