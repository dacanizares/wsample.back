import { UpdateEmployeeCommand } from "../commands/EmployeeCommands";
import { Employee, UpdatedEmployee } from "../domain/models/Employee";

export function MapEmployeeFieldsForUpdate(command: UpdateEmployeeCommand, employee: UpdatedEmployee) {
  employee.firstName = command.firstName;
  employee.lastName = command.lastName;
  employee.hireDate = command.hireDate;
  employee.phone = command.phone;
  employee.address = command.address;
  employee.avatarUrl = command.avatarUrl;
  employee.modificationDate = new Date().toISOString();
}

export function MapToUpdatedEmployee(employee?: Employee): UpdatedEmployee | null {
  if (!employee) {
    return null;
  }

  const result = {} as UpdatedEmployee;
  result.id = employee.id;
  result.active = employee.active;
  result.firstName = employee.firstName;
  result.lastName = employee.lastName;
  result.hireDate = employee.hireDate?.toISOString();
  result.phone = employee.phone;
  result.address = employee.address;
  result.avatarUrl = employee.avatarUrl;
  result.modificationDate = new Date().toISOString();

  return result;
}
