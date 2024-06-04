import express, { Request, Response, NextFunction } from "express";

import { Employee } from "../domain/models/Employee";
import { CreateEmployeeCommand, DeleteEmployeeCommand, UpdateEmployeeCommand } from "../commands/EmployeeCommands"; 
import { ToggleEmployeeStatusCommand, AddEmployeeToDepartmentCommand } from "../commands/EmployeeCommands";
import { EmployeeViewModel } from "../viewModels/EmployeeViewModels";
import { MapTo, MapAllTo } from "../infrastructure/Mapper";

import EmployeeQueries from "../queries/EmployeeQueries";
import IEmployeeService from "../domain/services/IEmployeeService";
import getDependecy from "../infrastructure/ServiceFactory";
import validateModel from "../infrastructure/Validator";

const router = express.Router();

const employeeLog = (_req: Request, _res: Response, next: NextFunction) => {
  console.log(`[server]: Accessing employee route.`);
  next();
}

router.use(employeeLog);

//
// GET: employee/
//
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const result = await EmployeeQueries.findEmployees();
    
    res.send(
      MapAllTo<Employee, EmployeeViewModel>(result, EmployeeViewModel)
    );
  } catch (error) {
    console.log(`[server]: Path: "/". Body: "${req.body}"`);
    next(error);
  }
});


//
// POST: employee/
//
router.post('/', async (req: Request<{}, {}, CreateEmployeeCommand>, res: Response, next: NextFunction) => {
  try {
    const [command, isValid, validationErrors] = validateModel<CreateEmployeeCommand>(CreateEmployeeCommand, req.body);
    
    if (!isValid) {
      res.status(400).send(validationErrors);
    } else {
      const service = getDependecy<IEmployeeService>('IEmployeeService');
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
router.post('/togglestatus', async (req: Request<{}, {}, ToggleEmployeeStatusCommand>, res: Response, next: NextFunction) => {
  try {
    const [command, isValid, validationErrors] = validateModel<ToggleEmployeeStatusCommand>(ToggleEmployeeStatusCommand, req.body);
    
    if (!isValid) {
      res.status(400).send(validationErrors);
    } else {
      const service = getDependecy<IEmployeeService>('IEmployeeService');
      const result = await service.toggleEmployeeStatus(command);
      
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

//
// POST: employee/addtodepartment
//
router.post('/addtodepartment', async (req: Request<{}, {}, AddEmployeeToDepartmentCommand>, res: Response, next: NextFunction) => {
  try {
    const [command, isValid, validationErrors] = validateModel<AddEmployeeToDepartmentCommand>(AddEmployeeToDepartmentCommand, req.body);
    
    if (!isValid) {
      res.status(400).send(validationErrors);
    } else {
      const service = getDependecy<IEmployeeService>('IEmployeeService');
      const result = await service.addEmployeeToDepartment(command);
      
      if (result) {
        res.send(
          MapTo<Employee, EmployeeViewModel>(result, EmployeeViewModel)
        );
      } else {
        res.status(404).send(`Employee ${command.employeeId} or Department ${command.departmentId} not found.`);
      }
    }
  } catch (error) {
    console.log(`[server]: Path: "/". Body: "${req.body}"`);
    next(error);
  }
});

//
// PUT: employee/
//
router.put('/', async (req: Request<{}, {}, UpdateEmployeeCommand>, res: Response, next: NextFunction) => {
  try {
    const [command, isValid, validationErrors] = validateModel<UpdateEmployeeCommand>(UpdateEmployeeCommand, req.body);
    
    if (!isValid) {
      res.status(400).send(validationErrors);
    } else {
      const service = getDependecy<IEmployeeService>('IEmployeeService');
      const result = await service.updateEmployee(command);
      
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

//
// DELETE: employee/
//
router.delete('/', async (req: Request<{}, {}, DeleteEmployeeCommand>, res: Response, next: NextFunction) => {
  try {
    const [command, isValid, validationErrors] = validateModel<DeleteEmployeeCommand>(DeleteEmployeeCommand, req.body);
    
    if (!isValid) {
      res.status(400).send(validationErrors);
    } else {
      const service = getDependecy<IEmployeeService>('IEmployeeService');
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

