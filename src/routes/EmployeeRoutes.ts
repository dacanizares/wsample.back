import express, { Request, Response, NextFunction } from "express";
import { createEmployee } from "../repositories/EmployeeRepository";
import { Employee, NewEmployee } from "../domain/models/Employee";
import { CreateEmployee } from "../commands/EmployeeCommands";
import validateModel from "../infrastructure/Validator";
import { EmployeeViewModel } from "../viewModels/EmployeeViewModels";
import MapTo from "../infrastructure/Mapper";

const router = express.Router();

const employeeLog = (_req: Request, _res: Response, next: NextFunction) => {
  console.log(`[server]: Accessing employee route.`);
  next();
}

router.use(employeeLog);

router.post('/', async (req: Request<{}, {}, CreateEmployee>, res: Response, next: NextFunction) => {
  try {
    const [command, isValid, validationErrors] = validateModel<CreateEmployee>(CreateEmployee, req.body);
    
    if (!isValid) {
      res.status(400).send(validationErrors);
    } else {
      const result = await createEmployee({
        active: 1,
        ...command,
      } as NewEmployee);
      
      res.send(
        MapTo<Employee, EmployeeViewModel>(result, new EmployeeViewModel())
      );
    }    
  } catch (error) {
    console.log(`[server]: Path: "/". Body: "${req.body}"`);
    next(error);
  }
});

export default router;

