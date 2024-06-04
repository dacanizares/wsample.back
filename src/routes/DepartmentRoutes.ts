import express, { Request, Response, NextFunction } from "express";

import { MapTo, MapAllTo } from "../infrastructure/Mapper";
import { Department } from "../domain/models/Department";
import { DepartmentViewModel } from "../viewModels/DepartmentViewModels";
import DepartmentQueries from "../queries/DepartmentQueries";

const router = express.Router();

const departmentLog = (_req: Request, _res: Response, next: NextFunction) => {
  console.log(`[server]: Accessing department route.`);
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

export default router;

