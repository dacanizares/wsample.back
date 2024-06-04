import { db } from '../infrastructure/Database'
import { Employee, NewEmployee, UpdatedEmployee, EMPLOYEE_TABLE } from '../domain/models/Employee'
import IEmployeeRepository from '../domain/repositoryInterfaces/IEmployeeRepository';

class EmployeeRepository implements IEmployeeRepository {
  async findEmployeeById(id: number) : Promise<Employee | undefined> {
    return await db.selectFrom(EMPLOYEE_TABLE)
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  async updateEmployee(id: number, employee: UpdatedEmployee): Promise<Employee> {
    return await db.updateTable(EMPLOYEE_TABLE)
      .set(employee)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async createEmployee(employee: NewEmployee): Promise<Employee> {
    return await db.insertInto(EMPLOYEE_TABLE)
      .values(employee)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async deleteEmployee(id: number): Promise<Employee | undefined> {
    return await db.deleteFrom(EMPLOYEE_TABLE)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }
}

export default EmployeeRepository;
