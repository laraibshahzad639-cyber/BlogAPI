
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

routers.post("/:postId/comments",authenticationMiddleware, addCommentController);

routers.patch("/:id",authenticationMiddleware,updateCommentController);

routers.delete("/:id", authenticationMiddleware, deleteCommentController);
routers.get(
  "/:postId/comments",
  authenticationMiddleware,
  getCommentsController
);

export { routers };