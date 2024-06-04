import express, { Request, Response, NextFunction } from "express";

import { MapTo, MapAllTo } from "../infrastructure/Mapper";
import { Department } from "../domain/models/Department";
import { DepartmentViewModel } from "../viewModels/DepartmentViewModels";
import DepartmentQueries from "../queries/DepartmentQueries";
import { tryParseNumber } from "../mappers/BasicMapper";

const router = express.Router();

const departmentLog = (_req: Request, _res: Response, next: NextFunction) => {
  if (process.env.VERBOSE === "true") {
    console.log(`[server]: Accessing department route.`);
  }
  next();
}

router.use(departmentLog);

//
// GET: department/
//
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const result = await DepartmentQueries.findDepartments();
    
    res.send(
      MapAllTo<Department, DepartmentViewModel>(result, DepartmentViewModel)
    );
  } catch (error) {
    console.log(`[server]: Path: "/". Body: "${req.body}"`);
    next(error);
  }
});


//
// GET: department/:id
//
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = tryParseNumber(req.params['id']);
    if (!id) {
      res.status(400).send('id is not a number');
    } else {
      const result = await DepartmentQueries.findDepartmentById(id);
      
      if (result) {
        res.send(
          MapTo<Department, DepartmentViewModel>(result, DepartmentViewModel)
        );
      } else {
        res.status(404).send(`Department ${id} not found.`);
      }
    }
  } catch (error) {
    console.log(`[server]: Path: "/". Body: "${req.body}"`);
    next(error);
  }
});

export default router;

