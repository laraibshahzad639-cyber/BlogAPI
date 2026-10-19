import { Router } from "express";
import { loginController, registerUsersController } from "./auth.controller.js";

const route = Router();

route.post("/register", registerUsersController);
route.post("/login",loginController)
export { route };