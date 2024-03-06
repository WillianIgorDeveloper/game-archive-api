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

// -------- Middleware --------
// router.use(async (req, res, next) => {
//   try {
//     const { token } = tokenSchema.parse((req.headers.authorization as string).split(" ")[1]);
//     const { success, message, customerID } = await verifyToken({ token });
//     if (!success) return res.status(401).send({ success, message });
//     (req as any).customerID = customerID;
//     next();
//   } catch (error) {
//     console.log(error);

//     if (error instanceof z.ZodError) {
//       return res.status(400).send({
//         success: false,
//         message: "Invalid token or no token provided",
//       });
//     }

//     return res.status(500).send({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });
