import express from "express";
import cors from "cors";
import "dotenv/config";

import authRouter from "./routes/auth.route";
import gamesRouter from "./routes/games.route";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/auth", authRouter);
server.use("/games", gamesRouter);

server.listen(process.env.PORT ?? 2000, () => {
  console.log(`✔️  Server listening on port ${process.env.PORT ?? 2000}`);
});
