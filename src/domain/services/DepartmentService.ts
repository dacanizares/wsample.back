import { Department } from "../models/Department";
import IDepartmentRepository from "../repositoryInterfaces/IDepartmentRepository";


class DepartmentService {
  Repository: IDepartmentRepository;

  constructor(repository: IDepartmentRepository) {
    this.Repository = repository;
  }

  async findDepartmentById(id: number): Promise<Department | undefined> {
    const result = await this.Repository.findDeparmentById(id);
    return result;
  }
}

export default DepartmentService;
