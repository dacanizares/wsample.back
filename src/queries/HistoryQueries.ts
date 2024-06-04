import { db } from '../infrastructure/Database'
import { History, HISTORY_TABLE } from '../domain/models/History';


const HistoryQueries = {
  async findHistoryByEmployeeId(employeeId: number): Promise<History[]> {
    return await db.selectFrom(HISTORY_TABLE)
      .where('employeeId', '=', employeeId)
      .orderBy('date desc')
      .selectAll()
      .execute();
  }
}

export default HistoryQueries;
