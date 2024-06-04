import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.get("/", (_req: Request, res: Response) => {
  res.send("SEM Backend");
});
app.listen(port, () => {
  console.log(`[server]: Running at http://localhost:${port}`);
});
