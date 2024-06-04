import { EmployeeTable } from '../domain/models/Employee'
import { DepartmentTable } from '../domain/models/Department';
import DatabaseConstructor, { Database } from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'


export interface DatabaseDefinition {
  employee: EmployeeTable,
  department: DepartmentTable
}

function openDb(): Database {
  const db: Database = new DatabaseConstructor('.semsqlite.db');
  return db;
}

const dialect = new SqliteDialect({
  database: openDb(),
})

export function getDbConnection(): Kysely<DatabaseDefinition> {
  return new Kysely<DatabaseDefinition>({
    dialect,
  })
}

export const db = getDbConnection();
