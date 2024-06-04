import { EmployeeTable } from '../domain/models/Employee'
import DatabaseConstructor, { Database } from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'


export interface DatabaseDefinition {
  employee: EmployeeTable,
}

function openDb(): Database {
  const db: Database = new DatabaseConstructor('semsqllite.db');
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
