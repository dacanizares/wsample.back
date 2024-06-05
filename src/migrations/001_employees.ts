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
      .values({ 
        "active": 1, 
        "firstName": "Dale", 
        "lastName": "Cooper",
        "avatarUrl": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
      } as NewEmployee)
      .returningAll()
      .executeTakeFirstOrThrow();
    await db.insertInto(EMPLOYEE_TABLE)
      .values({ 
        "active": 1, 
        "firstName": "Windom", 
        "lastName": "Earl",
        "avatarUrl": "https://www.twinpeaksblog.com/wp-content/uploads/2021/04/06_TPB_CostumeWindom_MauveZone_2014WindomTable.jpg" 
      } as NewEmployee)
      .returningAll()
      .executeTakeFirstOrThrow();
    await db.insertInto(EMPLOYEE_TABLE)
      .values({ 
        "active": 1, 
        "firstName": "Shelly", 
        "lastName": "Johnson",
        "avatarUrl": "https://upload.wikimedia.org/wikipedia/en/f/f8/Shelly_Johnson_in_Twin_Peaks.png" 
      } as NewEmployee)
      .returningAll()
      .executeTakeFirstOrThrow();
    await db.insertInto(EMPLOYEE_TABLE)
      .values({ 
        "active": 1, 
        "firstName": "Warren", 
        "lastName": "Frost",
        "avatarUrl": "https://upload.wikimedia.org/wikipedia/en/2/2e/Warren_Frost_Twin_Peaks_resize.jpg" 
      } as NewEmployee)
      .returningAll()
      .executeTakeFirstOrThrow();
}

export async function down(db: Kysely<DatabaseDefinition>): Promise<void> {
  await db.schema.dropTable(EMPLOYEE_TABLE).execute();
}
