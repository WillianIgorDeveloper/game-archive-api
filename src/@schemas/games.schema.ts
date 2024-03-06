import { z } from "zod";

export const newGameSchema = z.object({
  name: z.string().min(2),
});
