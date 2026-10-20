
import { Router } from "express";

import {
  getMyProfileController,
  updateMyProfileController,
  updateMyPasswordController
} from "./user.controller.js";
import { authenticationMiddleware } from "../../middleware/auth.middleware.js";

const routes = Router();



/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get my profile
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       "200":
 *         description: User profile fetched successfully
 *       "401":
 *         description: Authentication required
 *       "404":
 *         description: User not found
 */
routes.get("/me", authenticationMiddleware, getMyProfileController);

/**
 * @openapi
 * /api/users/me:
 *   patch:
 *     summary: Update my profile
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sara Updated
 *     responses:
 *       "200":
 *         description: Profile updated successfully
 *       "401":
 *         description: Authentication required
 *       "404":
 *         description: User not found
 */
routes.patch("/me", authenticationMiddleware, updateMyProfileController);

/**
 * @openapi
 * /api/users/me/password:
 *   patch:
 *     summary: Update my password
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: MyPassword123
 *               newPassword:
 *                 type: string
 *                 example: MyNewPassword123
 *     responses:
 *       "200":
 *         description: Password updated successfully
 *       "401":
 *         description: Authentication required or invalid password
 *       "404":
 *         description: User not found
 */
routes.patch(
  "/me/password",
  authenticationMiddleware,
  updateMyPasswordController
);

export { routes };