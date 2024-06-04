import { Kysely, sql } from 'kysely'
import { DatabaseDefinition } from '../infrastructure/Database';
import { HISTORY_TABLE } from '../domain/models/History';

export async function up(db: Kysely<DatabaseDefinition>): Promise<void> {
  await db.schema
    .createTable(HISTORY_TABLE)
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('employeeId', 'integer', (col) => 
      col.references('employee.id').onDelete('cascade').notNull()
    )
    .addColumn('departmentId', 'integer', (col) => 
      col.references('department.id').onDelete('cascade').notNull()
    )
    .addColumn('date', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();
  
  await db.schema
    .createIndex('history_index')
    .on(HISTORY_TABLE)
    .columns(['employeeId', 'departmentId'])
    .execute()
}

export async function down(db: Kysely<DatabaseDefinition>): Promise<void> {
  await db.schema.dropTable(HISTORY_TABLE).execute();
}


