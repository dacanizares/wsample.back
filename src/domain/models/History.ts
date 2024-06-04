import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export const HISTORY_TABLE = 'history';

export interface HistoryTable {
  id: Generated<number>
  employeeId: number;
  departmentId: number;
  
  // ColumnType<SelectType, InsertType, UpdateType>
  date: ColumnType<Date, string, never>;
}

export type History = Selectable<HistoryTable>
export type NewHistory = Insertable<HistoryTable>
