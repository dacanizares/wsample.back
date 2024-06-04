import { Employee, UpdatedEmployee } from "../domain/models/Employee";

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
