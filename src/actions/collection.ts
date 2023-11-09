"use server";

import { prisma } from "@/lib/prisma";
import { CollectionSchema } from "@/schemas/createCollection";
import { currentUser } from "@clerk/nextjs";

export async function createCollection(form: CollectionSchema) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.collection.create({
    data: {
      name: form.name,
      color: form.color,
      userId: user.id,
    },
  });
}

export async function deleteCollection(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.collection.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}
