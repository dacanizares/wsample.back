import { Department } from "../models/Department";

interface IDepartmentService {
  findDepartmentById(id: number): Promise<Department | undefined>
}

export default IDepartmentService;
