
import { sendError } from "../../utils/AppError.js";
import { sendSuccess } from "../../utils/apiResponse.js";
import { addComments, allowedPost,updateComment,deleteComment ,findOwnComment,getCommentsByPostId} from "./comment.service.js";

export const addCommentController = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (typeof content !== "string" || !content.trim()) {
      return sendError(res, 400, "Comment content is required");
    }

    const post = await allowedPost(postId, req.user.userId);

    if (!post) {
      return sendError(res, 404, "Post not found");
    }

    const comment = await addComments({
      content: content.trim(),
      postId,
      authorId: req.user.userId
    });

    return sendSuccess(
      res,
      201,
      "Comment added successfully",
      comment
    );
  } catch (error) {
    console.error("ADD COMMENT ERROR:", error);
    next(error);
  }
};

export const updateCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    if (typeof content !== "string" || !content.trim()) {
      return sendError(res, 400, "Comment content is required");
    }

    console.log("Comment ID:", id);
    console.log("Logged-in user ID:", userId);

    const existingComment = await findOwnComment(id, userId);

    // Check whether the comment was found
    console.log("Found comment:", existingComment);

    if (!existingComment) {
      return sendError(res, 404, "Comment not found");
    }

    const updatedComment = await updateComment(id, userId, {
      content: content.trim(),
    });

    return sendSuccess(
      res,
      200,
      "Comment updated successfully",
      updatedComment
    );
  } catch (error) {
    next(error);
  }
};



export const deleteCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const existingComment = await findOwnComment(id, userId);

    if (!existingComment) {
      return sendError(res, 404, "Comment not found");
    }

    await deleteComment(id, userId);

    return sendSuccess(
      res,
      200,
      "Comment deleted successfully",
      null
    );
  } catch (error) {
    next(error);
  }
};
export const getCommentsController = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(req.query.limit) || 10)
    );

    const comments = await getCommentsByPostId(postId, page, limit);

    return sendSuccess(res, 200, "Comments fetched successfully", {
      page,
      limit,
      comments,
    });
  } catch (error) {
    next(error);
  }
};