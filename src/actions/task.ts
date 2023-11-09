"use server";

import { prisma } from "@/lib/prisma";
import { TaskSchema } from "@/schemas/createTask";
import { currentUser } from "@clerk/nextjs";

export async function createTask(form: TaskSchema) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.task.create({
    data: {
      userId: user.id,
      content: form.content,
      collectionId: form.collectionId,
      expiresAt: form.expiresAt,
    },
  });
}

export async function toggleTaskDone(id: number, done: boolean) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.task.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      done,
    },
  });
}
