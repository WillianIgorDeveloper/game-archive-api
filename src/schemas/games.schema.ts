import { z } from "zod";

export const gamesSchema = z.object({
  search: z.string().optional(),
});

export const newGameSchema = z.object({
  name: z.string().min(2),
});
