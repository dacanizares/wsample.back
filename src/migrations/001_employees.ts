import { Kysely, sql } from 'kysely'
import { DatabaseDefinition } from '../infrastructure/Database';
import { EMPLOYEE_TABLE, NewEmployee } from '../domain/models/Employee';

export async function up(db: Kysely<DatabaseDefinition>): Promise<void> {
  await db.schema
    .createTable(EMPLOYEE_TABLE)
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('active', 'integer', (col) => col.notNull())
    .addColumn('firstName', 'text', (col) => col.notNull())
    .addColumn('lastName', 'text', (col) => col.notNull())
    .addColumn('hireDate', 'timestamp')
    .addColumn('phone', 'text')
    .addColumn('address', 'text')
    .addColumn('avatarUrl', 'text')
    .addColumn('creationDate', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('modificationDate', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

    // Seed data
    await db.insertInto(EMPLOYEE_TABLE)
      .values({ "active": 1, "firstName": "Dale", "lastName": "Cooper" } as NewEmployee)
      .returningAll()
      .executeTakeFirstOrThrow();
}

export async function down(db: Kysely<DatabaseDefinition>): Promise<void> {
  await db.schema.dropTable(EMPLOYEE_TABLE).execute();
}
