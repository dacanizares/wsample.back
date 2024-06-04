import { AddEmployeeToDepartmentCommand, CreateEmployeeCommand, DeleteEmployeeCommand, ToggleEmployeeStatusCommand,  UpdateEmployeeCommand } from "../../commands/EmployeeCommands";
import { Employee } from "../models/Employee";

interface IEmployeeService {
  createEmployee(command: CreateEmployeeCommand): Promise<Employee>
  toggleEmployeeStatus(command: ToggleEmployeeStatusCommand): Promise<Employee | undefined>
  addEmployeeToDepartment(command: AddEmployeeToDepartmentCommand): Promise<Employee | undefined>
  updateEmployee(command: UpdateEmployeeCommand): Promise<Employee | undefined>
  deleteEmployee(command: DeleteEmployeeCommand): Promise<Employee | undefined>
}

export default IEmployeeService;
