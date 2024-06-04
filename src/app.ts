import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";

import employeeRoutes from "./routes/EmployeeRoutes";
import departmentRoutes from "./routes/DepartmentRoutes";

dotenv.config();

const app: Express = express();

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

export default app;
