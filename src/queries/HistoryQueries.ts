import { db } from '../infrastructure/Database'
import { History, HISTORY_TABLE } from '../domain/models/History';
import { DEPARTMENT_TABLE } from '../domain/models/Department';


const HistoryQueries = {
  async findHistoryByEmployeeId(employeeId: number): Promise<History[]> {
    return await db.selectFrom(HISTORY_TABLE)
      .innerJoin(DEPARTMENT_TABLE, `${DEPARTMENT_TABLE}.id`, `${HISTORY_TABLE}.departmentId`)
      .select([
        'employeeId',
        'departmentId',
        'date',
        `${DEPARTMENT_TABLE}.name as departmentName`
      ])
      .where(`${HISTORY_TABLE}.id`, '=', employeeId)
      .orderBy('date desc')
      .selectAll()
      .execute();
  }
}

export default HistoryQueries;
