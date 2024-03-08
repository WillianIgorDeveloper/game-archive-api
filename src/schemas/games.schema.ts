import { z } from "zod";

export const loadGamesSchema = z.object({
  search: z.string().optional(),
});

export const newGameSchema = z.object({
  name: z.string().min(2),
  score: z.string().optional(),
  status: z.string().optional(),
  gameLink: z.string().optional(),
});
