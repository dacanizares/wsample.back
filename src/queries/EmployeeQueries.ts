import { db } from '../infrastructure/Database'
import { Employee, EMPLOYEE_TABLE } from '../domain/models/Employee'
import { DEPARTMENT_TABLE } from '../domain/models/Department';
import { EmployeeViewModel } from '../viewModels/EmployeeViewModels';


const EmployeeQueries = {
  async findEmployeeById(id: number): Promise<EmployeeViewModel | undefined> {
    return await db.selectFrom(EMPLOYEE_TABLE)
      .leftJoin(DEPARTMENT_TABLE, `${DEPARTMENT_TABLE}.id`, `${EMPLOYEE_TABLE}.departmentId`)
      .select([
        `${EMPLOYEE_TABLE}.id as id`,
        'active',
        'firstName',
        'lastName',
        'hireDate',
        'phone',
        'address',
        'avatarUrl',
        'departmentId',
        `${DEPARTMENT_TABLE}.name as departmentName`
      ])
      .where(`${EMPLOYEE_TABLE}.id`, '=', id)
      .executeTakeFirst();
  },

  async findEmployees(): Promise<Array<EmployeeViewModel>> {
    return await db.selectFrom(EMPLOYEE_TABLE)
      .leftJoin(DEPARTMENT_TABLE, `${DEPARTMENT_TABLE}.id`, `${EMPLOYEE_TABLE}.departmentId`)
      .select([
        `${EMPLOYEE_TABLE}.id as id`,
        'active',
        'firstName',
        'lastName',
        'hireDate',
        'phone',
        'address',
        'avatarUrl',
        'departmentId',
        `${DEPARTMENT_TABLE}.name as departmentName`
      ])
      .execute();
  }
}

export default EmployeeQueries;
