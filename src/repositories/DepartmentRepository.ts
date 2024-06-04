import { db } from '../infrastructure/Database'
import IDepartmentRepository from '../domain/repositoryInterfaces/IDepartmentRepository';
import { Department, DEPARTMENT_TABLE } from '../domain/models/Department';

class DeparmentRepository implements IDepartmentRepository {
  async findDeparmentById(id: number) : Promise<Department | undefined> {
    return await db.selectFrom(DEPARTMENT_TABLE)
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }
}

export default DeparmentRepository;
