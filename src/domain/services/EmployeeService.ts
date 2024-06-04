import { CreateEmployeeCommand, DeleteEmployeeCommand, ToggleEmployeeStatusCommand, UpdateEmployeeCommand } from "../../commands/EmployeeCommands";
import { MapEmployeeFieldsForUpdate } from "../../mappers/EmployeeMappers";
import { NewEmployee, Employee } from "../models/Employee";
import IEmployeeRepository from "../repositoryInterfaces/IEmployeeRepository";


class EmployeeService {
  Repository: IEmployeeRepository;

  constructor(repository: IEmployeeRepository) {
    this.Repository = repository;
  }

  async createEmployee(command: CreateEmployeeCommand): Promise<Employee> {
    const newEmployee = {
      active: 1,
      ...command,
    } as NewEmployee;

    const result = await this.Repository.createEmployee(newEmployee);
    return result;
  }  

  async toggleEmployeeStatus(command: ToggleEmployeeStatusCommand): Promise<Employee | undefined> {
    const storedEmployee = await this.Repository.findEmployeeForUpdateById(command.id);
    if (!storedEmployee) {
      return undefined;
    } else {
      storedEmployee.active = command.active;
      storedEmployee.modificationDate = new Date().toISOString();
      return await this.Repository.updateEmployee(command.id, storedEmployee);
    }
  }

  async updateEmployee(command: UpdateEmployeeCommand): Promise<Employee | undefined> {
    const storedEmployee = await this.Repository.findEmployeeForUpdateById(command.id);
    if (!storedEmployee) {
      return undefined;
    } else {
      MapEmployeeFieldsForUpdate(command, storedEmployee);
      return await this.Repository.updateEmployee(command.id, storedEmployee); 
    }
  }
  
  async deleteEmployee(command: DeleteEmployeeCommand): Promise<Employee | undefined> {
    const result = await this.Repository.deleteEmployee(command.id);
    return result;
  }
}

export default EmployeeService;
