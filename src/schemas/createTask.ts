import { z } from "zod";

export const taskValidator = z.object({
  collectionId: z.number().nonnegative(),
  content: z.string().min(8).max(255),
  done: z.boolean().default(false),
  expiresAt: z.date().optional(),
});

export type TaskSchema = z.infer<typeof taskValidator>;
