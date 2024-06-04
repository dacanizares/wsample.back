import { CreateEmployee, DeleteEmployee, ToggleEmployeeStatus } from "../../commands/EmployeeCommands";
import MapTo from "../../infrastructure/Mapper";
import { NewEmployee, UpdatedEmployee, Employee, MapToUpdatedEmployee } from "../models/Employee";
import IEmployeeRepository from "../repositoryInterfaces/IEmployeeRepository";


class EmployeeService {
  Repository: IEmployeeRepository;

  constructor(repository: IEmployeeRepository) {
    this.Repository = repository;
  }

  async createEmployee(command: CreateEmployee): Promise<Employee> {
    const newEmployee = {
      active: 1,
      ...command,
    } as NewEmployee;

    const result = await this.Repository.createEmployee(newEmployee);
    return result;
  }  

  async toggleEmployeeStatus(command: ToggleEmployeeStatus): Promise<Employee> {
    const storedEmployee = await this.Repository.findEmployeeById(command.id);
    if (!storedEmployee) {
      throw Error(`Employee ${command.id} does not exist.`)
    } else {
      storedEmployee.active = command.active;

      const updatedEmployee = MapToUpdatedEmployee(storedEmployee);
      return await this.Repository.updateEmployee(command.id, updatedEmployee);
    }
  }
  
  async deleteEmployee(command: DeleteEmployee): Promise<Employee | undefined> {
    const result = await this.Repository.deleteEmployee(command.id);
    return result;
  }
}

export default EmployeeService;
