import { sendError } from "../../utils/AppError.js"
import { createPost,getPosts,getMyPosts ,getpostById,updatePost,deletePost} from "./post.service.js"
import { sendSuccess } from "../../utils/apiResponse.js"


export const addPost = async (req, res, next) => {
  try {
    const { title, content, isPublic = true } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return sendError(res, 400, "Title and content are required");
    }

    if (typeof isPublic !== "boolean") {
      return sendError(res, 400, "isPublic must be true or false");
    }

    const post = await createPost({
      title: title.trim(),
      content: content.trim(),
      isPublic,
   authorId: req.user.userId
    });

    return sendSuccess(res, 201, "Post added successfully", post);
  } catch (error) {
     console.error("CREATE POST ERROR:", error);
    next(error);
  }
};
export const getAllPostController = async (req, res, next) => {
  try {
   const allPost = await getPosts();

    if (allPost.length === 0) {
      return sendError(res, 404, "Post Not Found");
    }

    return sendSuccess(res, 200, "Post fetched successfully", allPost);
  } catch (error) {
    next(error);
  }
};
export const getMyPostsController = async (req, res, next) => {
  try {
    const { isPublic } = req.query;

    let publicFilter;

    if (isPublic === "true") {
      publicFilter = true;
    } else if (isPublic === "false") {
      publicFilter = false;
    }

    const posts = await getMyPosts(
      req.user.userId,
      publicFilter
    );

    return sendSuccess(res, 200, "My posts fetched successfully", posts);
  } catch (error) {
    next(error);
  }
};
export const getPostByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getPostId = await getpostById(id, req.user.userId);

    if (!getPostId) {
      return sendError(res, 404, `post not found, ID: ${id}`);
    }

    return sendSuccess(
      res,
      200,
      `Post fetched successfully, ID: ${id}`,
      getPostId,
    );
  } catch (error) {
     console.error("Get Post By ID Error:", error);
    return next(error);
  }
};

export const updatePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, isPublic } = req.body;

    const data = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return sendError(res, 400, "Title must be a non-empty string");
      }

      data.title = title.trim();
    }

    if (content !== undefined) {
      if (typeof content !== "string" || !content.trim()) {
        return sendError(res, 400, "Content must be a non-empty string");
      }

      data.content = content.trim();
    }

    if (isPublic !== undefined) {
      if (typeof isPublic !== "boolean") {
        return sendError(res, 400, "isPublic must be true or false");
      }

      data.isPublic = isPublic;
    }

    

    const updatedPost = await updatePost(
      id,
      req.user.userId,
      data
    );

    if (!updatedPost) {
      return sendError(res, 404, "Post not found");
    }

    return sendSuccess(
      res,
      200,
      "Post updated successfully",
      updatedPost
    );
  } catch (error) {
    console.error("UPDATE POST ERROR:", error);
    next(error);
  }
};


export const deletePostController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPost = await deletePost(
      id,
      req.user.userId
    );

    if (!deletedPost) {
      return sendError(res, 404, "Post not found");
    }

    return sendSuccess(
      res,
      200,
      "Post deleted successfully",
      deletedPost
    );
  } catch (error) {
    console.error("DELETE POST ERROR:", error);
    next(error);
  }
};