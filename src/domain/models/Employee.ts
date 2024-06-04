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
  departmentId: number | null
  
  // ColumnType<SelectType, InsertType, UpdateType>
  creationDate: ColumnType<Date, string, never>;
  modificationDate: ColumnType<Date, string, string>;
}

export type Employee = Selectable<EmployeeTable>
export type NewEmployee = Insertable<EmployeeTable>
export type UpdatedEmployee = Updateable<EmployeeTable>
