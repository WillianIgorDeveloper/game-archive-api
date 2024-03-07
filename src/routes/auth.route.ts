import { z } from "zod";
import { authSchema } from "../schemas/auth.schema";
import { signIn, signUp } from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { tag, password } = authSchema.parse(req.body);
    const signUpResponse = await signUp({ tag, password });
    return res.status(200).send(signUpResponse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({
        success: false,
        message: "Tag or password is missing or invalid",
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

router.post("/signin", async (req, res) => {
  try {
    const { tag, password } = authSchema.parse(req.body);
    const signInResponse = await signIn({ tag, password });
    return res.status(200).send(signInResponse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({
        success: false,
        message: "Tag or password is missing or invalid",
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
