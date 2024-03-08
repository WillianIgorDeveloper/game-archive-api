import { z } from "zod";
import { Router } from "express";
import { tokenSchema } from "../../schemas/auth.schema";
import { verifyToken } from "../../controllers/auth.controller";
import { loadScores } from "../../controllers/scores.controller";

const router = Router();

// -------- Middleware --------
router.use(async (req, res, next) => {
  try {
    const { token } = tokenSchema.parse({
      token: ((req.headers.authorization as string) ?? "").split(" ")[1],
    });

    const { success, userID } = await verifyToken({ token });

    if (!success) return res.status(401).send();

    (req as any).userID = userID;
    next();
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return res.status(400).send({
        success: false,
        message: "Invalid token or no token provided",
        body: {},
      });
    }

    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      body: {},
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const userID = (req as any).userID;
    const loadScoreResponse = await loadScores({ userID });
    return res.status(200).send(loadScoreResponse);
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      body: {},
    });
  }
});

export default router;
