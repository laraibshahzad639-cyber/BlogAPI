import { Router } from "express";
import { loginController, registerUsersController ,logoutController} from "./auth.controller.js";

const route = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MyPassword123
 *     responses:
 *       "200":
 *         description: Login successful
 *       "400":
 *         description: Invalid request
 *       "401":
 *         description: Unauthorized
 */
route.post("/login", loginController);




/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       "200":
 *         description: Logout successful
 */
route.post("/logout", logoutController);

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123
 *     responses:
 *       "201":
 *         description: User registered
 *       "400":
 *         description: Validation error
 */
route.post("/register", registerUsersController);

export { route };
