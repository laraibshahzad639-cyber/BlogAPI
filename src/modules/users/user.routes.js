
import { Router } from "express";

import {
  getMyProfileController,
  updateMyProfileController,
  updateMyPasswordController
} from "./user.controller.js";
import { authenticationMiddleware } from "../../middleware/auth.middleware.js";

const routes = Router();

routes.get("/me", authenticationMiddleware, getMyProfileController);

routes.patch("/me", authenticationMiddleware, updateMyProfileController);

routes.patch(
  "/me/password",
  authenticationMiddleware,
  updateMyPasswordController
);

export { routes };
