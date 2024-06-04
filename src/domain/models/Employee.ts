import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export const EMPLOYEE_TABLE = 'employee';

export interface EmployeeTable {
  id: Generated<number>
  active: number;
  firstName: string;
  lastName: string;
  hireDate: ColumnType<Date | null, string | null, string | null>;
  phone: string | null;
  address: string | null;

  avatarUrl: string | null;
  
  // ColumnType<SelectType, InsertType, UpdateType>
  creationDate: ColumnType<Date, string, never>;
  modificationDate: ColumnType<Date, string, string>;
}

export type Employee = Selectable<EmployeeTable>
export type NewEmployee = Insertable<EmployeeTable>
export type UpdatedEmployee = Updateable<EmployeeTable>

export function MapToUpdatedEmployee(employee: Employee) {
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
