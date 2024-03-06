import { z } from "zod";
import { Router } from "express";
import { newGameSchema } from "../@schemas/games.schema";
import { createGame, loadGames } from "../controllers/games.controller";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const loadGamesResponse = await loadGames();
    return res.status(200).send(loadGamesResponse);
  } catch (error) {
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
    const createGameResponse = await createGame({ name });
    return res.status(200).send(createGameResponse);
  } catch (error) {
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
