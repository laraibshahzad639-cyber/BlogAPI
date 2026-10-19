import { db } from "../../prisma/db.ts";
import argon2 from "argon2";
export const createPost = async (data) => {
  return db.orm.public.Post.create(data);
};
export const getPosts = async () => {
  return await db.orm.public.Post.where({ isPublic: true })
    .include("comments")
    .orderBy((p) => p.createdAt.desc())
    .all();
};

export const getMyPosts = async (userId, isPublic) => {
  let query = db.orm.public.Post.where({ authorId: userId });

  if (isPublic !== undefined) {
    query = query.where({ isPublic });
  }

  return await query.all();
};
export const getpostById = async (id) => {
  return await db.orm.public.Post.where({ id, authorId: userId }).first();
};

export const updatePost = async (id, userId, data) => {
  return await db.orm.public.Post.where({ id, authorId: userId }).update(data);
};

export const deletePost = async (id, userId) => {
  return await db.orm.public.Post.where({ id, authorId: userId }).delete();
};
