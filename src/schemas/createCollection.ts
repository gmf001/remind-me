import { CollectionColors } from "@/constants";
import { z } from "zod";

export const collectionValidator = z.object({
  name: z
    .string()
    .min(4, { message: "Collection name must be at least 4 characters" }),
  color: z.string().refine((color) => {
    const colors = Object.keys(CollectionColors);
    return colors.includes(color);
  }),
});

export type CollectionSchema = z.infer<typeof collectionValidator>;
