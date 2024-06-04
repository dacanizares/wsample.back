import { Kysely, sql } from 'kysely'
import { DatabaseDefinition } from '../infrastructure/Database';
import { DEPARTMENT_TABLE, NewDepartment } from '../domain/models/Department';
import { EMPLOYEE_TABLE } from '../domain/models/Employee';

export async function up(db: Kysely<DatabaseDefinition>): Promise<void> {
  await db.schema
    .createTable(DEPARTMENT_TABLE)
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('creationDate', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('modificationDate', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();
  
  await db.schema
    .alterTable(EMPLOYEE_TABLE)
    .addColumn('department_id', 'integer', (col) =>
      col.references('department.id').onDelete('restrict')
    )
    .execute();  
  await db.schema
    .createIndex('employee_department_id_index')
    .on(EMPLOYEE_TABLE)
    .column('department_id')
    .execute()

    // Seed data
    await db.insertInto(DEPARTMENT_TABLE)
      .values({ "name": "Human Resources" } as NewDepartment)
      .returningAll()
      .executeTakeFirstOrThrow();
    await db.insertInto(DEPARTMENT_TABLE)
      .values({ "name": "Computer Science" } as NewDepartment)
      .returningAll()
      .executeTakeFirstOrThrow();
    await db.insertInto(DEPARTMENT_TABLE)
      .values({ "name": "Software Development" } as NewDepartment)
      .returningAll()
      .executeTakeFirstOrThrow();
    await db.insertInto(DEPARTMENT_TABLE)
      .values({ "name": "3D art" } as NewDepartment)
      .returningAll()
      .executeTakeFirstOrThrow();
    await db.insertInto(DEPARTMENT_TABLE)
      .values({ "name": "Music" } as NewDepartment)
      .returningAll()
      .executeTakeFirstOrThrow();
}

export async function down(db: Kysely<DatabaseDefinition>): Promise<void> {
  await db.schema.dropTable(DEPARTMENT_TABLE).execute();

  await db.schema.alterTable(EMPLOYEE_TABLE).dropIndex('employee_department_id_index').execute();
  await db.schema.alterTable(EMPLOYEE_TABLE).dropColumn('department_id').execute();
}

