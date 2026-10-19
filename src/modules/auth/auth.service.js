import { db } from "../../prisma/db.ts";

export const loginUser = async (email) => {
  return await db.orm.public.User.where({ email }).first();
};

export const registerUser = async (data) => {
  return await db.orm.public.User.create(data);
};
