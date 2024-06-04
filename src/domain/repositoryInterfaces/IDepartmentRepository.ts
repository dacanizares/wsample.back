import { Department } from "../models/Department";

interface IDepartmentRepository {
  findDeparmentById(id: number) : Promise<Department | undefined>;
}

export default IDepartmentRepository;
