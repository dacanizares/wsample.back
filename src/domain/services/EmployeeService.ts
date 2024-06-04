
import { AddEmployeeToDepartmentCommand, CreateEmployeeCommand, DeleteEmployeeCommand, ToggleEmployeeStatusCommand, UpdateEmployeeCommand } from "../../commands/EmployeeCommands";
import { MapEmployeeFieldsForUpdate, MapToUpdatedEmployee } from "../../mappers/EmployeeMappers";
import { NewEmployee,  Employee } from "../models/Employee";
import IEmployeeRepository from "../repositoryInterfaces/IEmployeeRepository";
import IDepartmentService from "./IDepartmentService";
import IEmployeeService from "./IEmployeeService";


class EmployeeService implements IEmployeeService {
  // Repository
  Repository: IEmployeeRepository;
  
  // Related services
  DepartmentService: IDepartmentService;

  constructor(repository: IEmployeeRepository, departmentService: IDepartmentService) {
    this.Repository = repository;
    this.DepartmentService = departmentService;
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
    const storedEmployee = await this.Repository.findEmployeeById(command.id);
    if (!storedEmployee) {
      return undefined;
    } else {
      const updatedEmployee = MapToUpdatedEmployee(storedEmployee);
      updatedEmployee.active = command.active;
      return await this.Repository.updateEmployee(command.id, updatedEmployee);
    }
  }

  async addEmployeeToDepartment(command: AddEmployeeToDepartmentCommand): Promise<Employee | undefined> {
    const storedEmployee = await this.Repository.findEmployeeById(command.employeeId);
    if (!storedEmployee) {
      return undefined;
    }
    const storedDepartment = await this.DepartmentService.findDepartmentById(command.departmentId);
    if (!storedDepartment) {
      return undefined;
    }

    const updatedEmployee = MapToUpdatedEmployee(storedEmployee);
    updatedEmployee.departmentId = command.departmentId;
    return await this.Repository.updateEmployee(command.employeeId, updatedEmployee);
  }

  async updateEmployee(command: UpdateEmployeeCommand): Promise<Employee | undefined> {
    const storedEmployee = await this.Repository.findEmployeeById(command.id);
    if (!storedEmployee) {
      return undefined;
    } else {
      const updatedEmployee = MapToUpdatedEmployee(storedEmployee);
      MapEmployeeFieldsForUpdate(command, updatedEmployee);
      return await this.Repository.updateEmployee(command.id, updatedEmployee); 
    }
  }
  
  async deleteEmployee(command: DeleteEmployeeCommand): Promise<Employee | undefined> {
    const result = await this.Repository.deleteEmployee(command.id);
    return result;
  }
}

export default EmployeeService;
