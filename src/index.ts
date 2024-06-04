import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";

import migrateToLatest from "./infrastructure/Migrator";
migrateToLatest();
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
// Standard security measures
app.use(helmet());
app.disable('x-powered-by');
app.get("/", (_req: Request, res: Response) => {
  res.send("SEM Backend");
});
app.listen(port, () => {
  console.log(`[server]: Running at http://localhost:${port}`);
});
