import { OnAddedToDepartment } from "../events/OnAddedToDepartment";
import { History } from "../models/History";

interface IHistoryService {
  createHistory(event: OnAddedToDepartment): Promise<History>
}

export default IHistoryService;
