import { History, NewHistory } from "../models/History";

interface IHistoryRepository {
  createHistory(history: NewHistory): Promise<History>;
}

export default IHistoryRepository;
