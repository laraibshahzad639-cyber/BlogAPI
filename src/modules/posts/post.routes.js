import { Router } from "express";
import { addPost, deletePostController, getAllPostController, getMyPostsController, getPostByIdController, updatePostController } from "./post.controller.js";
import { authenticationMiddleware } from "../../middleware/auth.middleware.js";


const router = Router();

router.post("/", authenticationMiddleware, addPost);
router.get("/", authenticationMiddleware, getAllPostController);
router.get("/me", authenticationMiddleware,getMyPostsController);
router.get("/:id",authenticationMiddleware,getPostByIdController)
router.patch("/:id", authenticationMiddleware, updatePostController);
router.delete("/:id", authenticationMiddleware, deletePostController);
export { router };