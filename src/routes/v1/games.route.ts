import { z } from "zod";
import { Router } from "express";
import { loadGamesSchema, newGameSchema } from "../../schemas/games.schema";
import { createGame, loadGames } from "../../controllers/games.controller";
import { tokenSchema } from "../../schemas/auth.schema";
import { verifyToken } from "../../controllers/auth.controller";

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
    const { search } = loadGamesSchema.parse(req.query);
    const userID = (req as any).userID;
    const loadGamesResponse = await loadGames({ userID, search });
    return res.status(200).send(loadGamesResponse);
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return res.status(400).send({
        success: false,
        message: "Query is missing or invalid",
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

router.post("/", async (req, res) => {
  try {
    const { name } = newGameSchema.parse(req.body);
    const userID = (req as any).userID;
    const createGameResponse = await createGame({ userID, name });
    return res.status(200).send(createGameResponse);
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return res.status(400).send({
        success: false,
        message: "Game has missing or invalid information",
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

export default router;
