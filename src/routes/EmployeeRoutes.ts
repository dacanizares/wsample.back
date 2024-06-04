import express, { Request, Response, NextFunction } from "express";

import { Employee, NewEmployee } from "../domain/models/Employee";
import { CreateEmployee, DeleteEmployee, ToggleEmployeeStatus } from "../commands/EmployeeCommands";
import validateModel from "../infrastructure/Validator";
import { EmployeeViewModel } from "../viewModels/EmployeeViewModels";
import MapTo from "../infrastructure/Mapper";
import EmployeeService from "../domain/services/employeeService";
import EmployeeRepository from "../repositories/EmployeeRepository";

const router = express.Router();

const employeeLog = (_req: Request, _res: Response, next: NextFunction) => {
  console.log(`[server]: Accessing employee route.`);
  next();
}

const getEmployeeService = (): EmployeeService => (
  new EmployeeService(new EmployeeRepository)
);

router.use(employeeLog);

//
// POST: employee/
//
router.post('/', async (req: Request<{}, {}, CreateEmployee>, res: Response, next: NextFunction) => {
  try {
    const [command, isValid, validationErrors] = validateModel<CreateEmployee>(CreateEmployee, req.body);
    
    if (!isValid) {
      res.status(400).send(validationErrors);
    } else {
      const service = getEmployeeService();
      const result = await service.createEmployee(command);
      
      res.send(
        MapTo<Employee, EmployeeViewModel>(result, EmployeeViewModel)
      );
    }
  } catch (error) {
    console.log(`[server]: Path: "/". Body: "${req.body}"`);
    next(error);
  }
});

//
// POST: employee/togglestatus
//
router.post('/togglestatus', async (req: Request<{}, {}, ToggleEmployeeStatus>, res: Response, next: NextFunction) => {
  try {
    const [command, isValid, validationErrors] = validateModel<ToggleEmployeeStatus>(ToggleEmployeeStatus, req.body);
    
    if (!isValid) {
      res.status(400).send(validationErrors);
    } else {
      const service = getEmployeeService();
      const result = await service.toggleEmployeeStatus(command);
      
      res.send(
        MapTo<Employee, EmployeeViewModel>(result, EmployeeViewModel)
      );
    }
  } catch (error) {
    console.log(`[server]: Path: "/". Body: "${req.body}"`);
    next(error);
  }
});

//
// DELETE: employee/
//
router.delete('/', async (req: Request<{}, {}, DeleteEmployee>, res: Response, next: NextFunction) => {
  try {
    const [command, isValid, validationErrors] = validateModel<DeleteEmployee>(DeleteEmployee, req.body);
    
    if (!isValid) {
      res.status(400).send(validationErrors);
    } else {
      const service = getEmployeeService();
      const result = await service.deleteEmployee(command);
      
      if (result) {
        res.send(
          MapTo<Employee, EmployeeViewModel>(result, EmployeeViewModel)
        );
      } else {
        res.status(404).send(`Employee ${command.id} not found.`);
      }
    }
  } catch (error) {
    console.log(`[server]: Path: "/". Body: "${req.body}"`);
    next(error);
  }
});

export default router;

