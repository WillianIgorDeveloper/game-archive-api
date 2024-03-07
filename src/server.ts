import express from "express";
import cors from "cors";
import "dotenv/config";

import v1Router from "./routes/v1";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/v1", v1Router);

server.listen(process.env.PORT ?? 2000, () => {
  console.log(`🟢  Server listening on port ${process.env.PORT ?? 2000}`);
});
