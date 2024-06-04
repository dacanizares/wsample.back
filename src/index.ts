import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";

import migrateToLatest from "./infrastructure/Migrator";
import employeeRoutes from "./routes/EmployeeRoutes";
import departmentRoutes from "./routes/DepartmentRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Standard security measures
app.use(helmet());
app.disable('x-powered-by');

// Add body parsers
app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("SEM Backend");
});

app.use('/employee', employeeRoutes);
app.use('/department', departmentRoutes);

app.listen(port, () => {
  console.log(`[server]: Running at http://localhost:${port}`);
});
