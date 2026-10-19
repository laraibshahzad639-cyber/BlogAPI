import { db } from "../../prisma/db.ts";
import argon2 from "argon2";

// Get logged-in user
export const getUserById = async (id) => {
  return await db.orm.public.User
    .where({ id })
    .first();
};

// Update user's name
export const updateUserName = async (id, name) => {
  await db.orm.public.User
    .where({ id })
    .update({ name });

  return await getUserById(id);
};

// Change user's password
export const updatePassword = async (id, newPassword) => {
  const hashedPassword = await argon2.hash(newPassword);

  return await db.orm.public.User
    .where({ id })
    .update({ password: hashedPassword });
};
