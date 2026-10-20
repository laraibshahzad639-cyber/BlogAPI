import { Router } from "express";
import { addPost, deletePostController, getAllPostController, getMyPostsController, getPostByIdController, updatePostController } from "./post.controller.js";
import { authenticationMiddleware } from "../../middleware/auth.middleware.js";


const router = Router();


/**
 * @openapi
 * /api/posts:
 *   post:
 *     summary: Create a post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first blog post
 *               content:
 *                 type: string
 *                 example: This is my blog post content
 *               visibility:
 *                 type: string
 *                 enum: [public, private]
 *                 example: public
 *     responses:
 *       "201":
 *         description: Post created successfully
 *       "401":
 *         description: Authentication required
 */
router.post("/", authenticationMiddleware, addPost);

/**
 * @openapi
 * /api/posts:
 *   get:
 *     summary: Get posts
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       "200":
 *         description: Posts fetched successfully
 *       "401":
 *         description: Authentication required
 */
router.get("/", authenticationMiddleware, getAllPostController);

/**
 * @openapi
 * /api/posts/me:
 *   get:
 *     summary: Get my posts
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       "200":
 *         description: Your posts fetched successfully
 *       "401":
 *         description: Authentication required
 */
router.get("/me", authenticationMiddleware, getMyPostsController);

/**
 * @openapi
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
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
 *         description: Post fetched successfully
 *       "401":
 *         description: Authentication required
 *       "404":
 *         description: Post not found
 */
router.get("/:id", authenticationMiddleware, getPostByIdController);

/**
 * @openapi
 * /api/posts/{id}:
 *   patch:
 *     summary: Update a post
 *     tags: [Posts]
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
 *               title:
 *                 type: string
 *                 example: Updated post title
 *               content:
 *                 type: string
 *                 example: Updated post content
 *               visibility:
 *                 type: string
 *                 enum: [public, private]
 *     responses:
 *       "200":
 *         description: Post updated successfully
 *       "401":
 *         description: Authentication required
 *       "404":
 *         description: Post not found
 */
router.patch("/:id", authenticationMiddleware, updatePostController);

/**
 * @openapi
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
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
 *         description: Post deleted successfully
 *       "401":
 *         description: Authentication required
 *       "404":
 *         description: Post not found
 */
router.delete("/:id", authenticationMiddleware, deletePostController);





// router.post("/", authenticationMiddleware, addPost);
// router.get("/", authenticationMiddleware, getAllPostController);
// router.get("/me", authenticationMiddleware,getMyPostsController);
// router.get("/:id",authenticationMiddleware,getPostByIdController)
// router.patch("/:id", authenticationMiddleware, updatePostController);
// router.delete("/:id", authenticationMiddleware, deletePostController);
export { router };