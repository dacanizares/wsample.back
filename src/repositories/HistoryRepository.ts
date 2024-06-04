import { db } from '../infrastructure/Database'
import { History, NewHistory, HISTORY_TABLE } from '../domain/models/History'
import IHistoryRepository from '../domain/repositoryInterfaces/IHistoryRepository';

class HistoryRepository implements IHistoryRepository {
  async createHistory(history: NewHistory): Promise<History> {
    return await db.insertInto(HISTORY_TABLE)
      .values(history)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}

export default HistoryRepository;
