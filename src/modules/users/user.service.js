import { db } from "../../prisma/db.ts";
import argon2 from "argon2";

export const getUserById = async (id) => {
  return await db.orm.public.User
    .where({ id })
    .first();
};


export const updateUserName = async (id, name) => {
  await db.orm.public.User
    .where({ id })
    .update({ name });

  return await getUserById(id);
};

export const updatePassword = async (id, newPassword) => {
  const hashedPassword = await argon2.hash(newPassword);

  return await db.orm.public.User
    .where({ id })
    .update({ password: hashedPassword });
};
