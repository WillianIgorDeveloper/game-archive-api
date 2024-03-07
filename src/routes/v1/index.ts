import { Router } from "express";
const router = Router();

import authRouter from "./auth.route";
import gamesRouter from "./games.route";

router.use("/auth", authRouter);
router.use("/games", gamesRouter);

export default router;
