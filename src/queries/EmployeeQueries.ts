import { db } from '../infrastructure/Database'
import { Employee, EMPLOYEE_TABLE } from '../domain/models/Employee'
import { DEPARTMENT_TABLE } from '../domain/models/Department';
import { EmployeeViewModel } from '../viewModels/EmployeeViewModels';


const EmployeeQueries = {
  async findEmployeeById(id: number): Promise<Employee | undefined> {
    return await db.selectFrom(EMPLOYEE_TABLE)
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  },

  async findEmployees(): Promise<Array<EmployeeViewModel>> {
    return await db.selectFrom(EMPLOYEE_TABLE)
      .leftJoin(DEPARTMENT_TABLE, `${DEPARTMENT_TABLE}.id`, `${EMPLOYEE_TABLE}.departmentId`)
      .select([
        'employee.id as id',
        'active',
        'firstName',
        'lastName',
        'hireDate',
        'phone',
        'address',
        'avatarUrl',
        'departmentId',
        'department.name as departmentName'
      ])
      .execute();
  }
}

export default EmployeeQueries;
