import { Router } from "express";
const router = Router();

import authRouter from "./auth.route";
import usersRouter from "./users.route";
import gamesRouter from "./games.route";
import statusRouter from "./status.route";
import scoresRouter from "./scores.route";

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/games", gamesRouter);
router.use("/status", statusRouter);
router.use("/scores", scoresRouter);

export default router;
