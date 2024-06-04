import { db } from '../infrastructure/Database'
import { Employee, NewEmployee, UpdatedEmployee, EMPLOYEE_TABLE } from '../domain/models/Employee'


const EmployeeQueries = {
  async findEmployeeById(id: number): Promise<Employee | undefined> {
    return await db.selectFrom(EMPLOYEE_TABLE)
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  },

  async findEmployees(): Promise<Array<Employee>> {
    return await db.selectFrom(EMPLOYEE_TABLE)
      .selectAll()
      .execute();
  }
}

export default EmployeeQueries;
