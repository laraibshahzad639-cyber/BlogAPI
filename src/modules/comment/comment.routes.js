
import { Router } from "express";
import { authenticationMiddleware } from "../../middleware/auth.middleware.js";

import {
  addCommentController,
 
  deleteCommentController,
 
  getCommentsController,
  updateCommentController,
 
} from "./comment.controller.js";
import { deletePostController } from "../posts/post.controller.js";

const routers = Router();


/**
 * @openapi
 * /api/comments/{postId}/comments:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 example: This is a great post!
 *     responses:
 *       "201":
 *         description: Comment created successfully
 *       "401":
 *         description: Authentication required
 */
routers.post("/:postId/comments", authenticationMiddleware, addCommentController);

/**
 * @openapi
 * /api/comments/{id}:
 *   patch:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated comment text
 *     responses:
 *       "200":
 *         description: Comment updated successfully
 *       "401":
 *         description: Authentication required
 *       "404":
 *         description: Comment not found
 */
routers.patch("/:id", authenticationMiddleware, updateCommentController);

/**
 * @openapi
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Comment deleted successfully
 *       "401":
 *         description: Authentication required
 *       "404":
 *         description: Comment not found
 */
routers.delete("/:id", authenticationMiddleware, deleteCommentController);

/**
 * @openapi
 * /api/comments/{postId}/comments:
 *   get:
 *     summary: Get comments for a post
 *     tags: [Comments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Comments fetched successfully
 *       "401":
 *         description: Authentication required
 *       "404":
 *         description: Post not found
 */
routers.get("/:postId/comments", authenticationMiddleware, getCommentsController);



export { routers };