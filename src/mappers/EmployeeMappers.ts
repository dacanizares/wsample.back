import { UpdateEmployeeCommand } from "../commands/EmployeeCommands";
import { Employee, UpdatedEmployee } from "../domain/models/Employee";
import { mapDateForSqlite, mapNowForSqlite } from "./BasicMapper";

export function MapEmployeeFieldsForUpdate(command: UpdateEmployeeCommand, employee: UpdatedEmployee) {
  employee.firstName = command.firstName;
  employee.lastName = command.lastName;
  employee.hireDate = command.hireDate;
  employee.phone = command.phone;
  employee.address = command.address;
  employee.avatarUrl = command.avatarUrl;
  employee.modificationDate = mapNowForSqlite();
}

export function MapToUpdatedEmployee(employee: Employee): UpdatedEmployee {
  const result = {} as UpdatedEmployee;
  result.id = employee.id;
  result.active = employee.active;
  result.firstName = employee.firstName;
  result.lastName = employee.lastName;
  result.hireDate = mapDateForSqlite(employee.hireDate);
  result.phone = employee.phone;
  result.address = employee.address;
  result.avatarUrl = employee.avatarUrl;
  result.departmentId = employee.departmentId;
  result.modificationDate = mapNowForSqlite();

  return result;
}
