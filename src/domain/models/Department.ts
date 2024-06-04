import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export const DEPARTMENT_TABLE = 'department';

export interface DepartmentTable {
  id: Generated<number>
  name: string;
  
  // ColumnType<SelectType, InsertType, UpdateType>
  creationDate: ColumnType<Date, string, never>;
  modificationDate: ColumnType<Date, string, string>;
}

export type Department = Selectable<DepartmentTable>
export type NewDepartment = Insertable<DepartmentTable>
export type UpdatedDepartment = Updateable<DepartmentTable>
