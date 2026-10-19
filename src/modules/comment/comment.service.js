
import { db } from "../../prisma/db.ts";

export const allowedPost = async (postId, userId) => {
  const post = await db.orm.public.Post
    .where({ id: postId })
    .first();

  if (!post) {
    return null;
  }

  if (!post.isPublic && post.authorId !== userId) {
    return null;
  }

  return post;
};

export const addComments = async (data) => {
  return await db.orm.public.Comment.create(data);
};
export const findOwnComment = async (id, userId) => {
  return await db.orm.public.Comment
    .where({ id, authorId: userId })
    .first();
};


export const updateComment = async (id, userId, data) => {
  return await db.orm.public.Comment
    .where({ id, authorId: userId })
    .update(data);
};


export const deleteComment = async (id, userId) => {
  return await db.orm.public.Comment
    .where({ id, authorId: userId })
    .delete();
};


export const getCommentsByPostId = async (postId, page, limit) => {
  const offset = (page - 1) * limit;

  return await db.orm.public.Comment
    .where({ postId })
    .orderBy((c) => c.createdAt.desc())
    .offset(offset)
    .limit(limit)
    .all();
};