import { Kysely, sql } from 'kysely'
import { DatabaseDefinition } from '../infrastructure/Database';
import { EMPLOYEE_TABLE } from '../domain/models/Employee';

export async function up(db: Kysely<DatabaseDefinition>): Promise<void> {
  await db.schema
    .createTable(EMPLOYEE_TABLE)
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('active', 'integer', (col) => col.notNull())
    .addColumn('firstName', 'text', (col) => col.notNull())
    .addColumn('lastName', 'text', (col) => col.notNull())
    .addColumn('hireDate', 'text')
    .addColumn('phone', 'text')
    .addColumn('address', 'text')
    .addColumn('avatarUrl', 'text')
    .addColumn('creationDate', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('modificationDate', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<DatabaseDefinition>): Promise<void> {
  await db.schema.dropTable(EMPLOYEE_TABLE).execute();
}
