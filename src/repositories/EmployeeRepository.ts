import { db } from '../infrastructure/Database'
import { Employee, NewEmployee, UpdatedEmployee, EMPLOYEE_TABLE } from '../domain/models/Employee'


export async function findEmployeeById(id: number) : Promise<Employee | undefined> {
  return await db.selectFrom(EMPLOYEE_TABLE)
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function updateEmployee(id: number, employee: UpdatedEmployee): Promise<void> {
  await db.updateTable(EMPLOYEE_TABLE)
    .set(employee)
    .where('id', '=', id)
    .execute();
}

export async function createEmployee(employee: NewEmployee): Promise<Employee> {
  return await db.insertInto(EMPLOYEE_TABLE)
    .values(employee)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteEmployee(id: number): Promise<Employee | undefined> {
  return await db.deleteFrom(EMPLOYEE_TABLE)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}
