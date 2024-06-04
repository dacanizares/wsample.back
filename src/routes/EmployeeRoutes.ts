import express, { Request, Response, NextFunction } from "express";
import { createEmployee } from "../repositories/EmployeeRepository";
import { NewEmployee } from "../domain/models/Employee";
import { CreateEmployee } from "../commands/EmployeeCommands";
import validateModel from "../infrastructure/Validator";

const router = express.Router();

const employeeLog = (_req: Request, _res: Response, next: NextFunction) => {
  console.log(`[server]: Accessing employee route.`);
  next();
}

router.use(employeeLog);

router.post('/', async (req: Request<{}, {}, CreateEmployee>, res: Response, next: NextFunction) => {
  try {
    const command = new CreateEmployee();
    
    type keys = keyof CreateEmployee;

    let isValid = true;
    const validationErrors: Array<string> = [];
    const requiredKeys: Array<string> = [];
    const addedKeys: Array<string> = [];

    Object.entries(command).forEach(([key, value]) => {
      if (value !== null) {
        requiredKeys.push(key);
      }
    });
    
    Object.entries(req.body).forEach(([key,value]) => {
      if (key in command) {
        command[key as keys] = value;
        addedKeys.push(key);
      } else {
        isValid = false;
        validationErrors.push(`Body key ${key} is invalid`);
      }
    });

    requiredKeys.forEach((key) => {
      if (!addedKeys.includes(key)) {
        validationErrors.push(`Body key ${key} is missing`);
        isValid = false;
      }
    });    
    
    if (!isValid) {
      res.status(400).send(validationErrors);
    } else {
      const result = await createEmployee({
        active: 1,
        ...command,
      } as NewEmployee)
  
      res.send(result);
    }    
  } catch (error) {
    console.log(`[server]: Path: "/". Body: "${req.body}"`);
    next(error);
  }
});

export default router;
