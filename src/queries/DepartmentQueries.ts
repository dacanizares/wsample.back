import { db } from '../infrastructure/Database'
import { Department, DEPARTMENT_TABLE } from '../domain/models/Department'


const DepartmentQueries = {
  async findDepartmentById(id: number): Promise<Department | undefined> {
    return await db.selectFrom(DEPARTMENT_TABLE)
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  },

  async findDepartments(): Promise<Array<Department>> {
    return await db.selectFrom(DEPARTMENT_TABLE)
      .selectAll()
      .execute();
  }
}

export default DepartmentQueries;
