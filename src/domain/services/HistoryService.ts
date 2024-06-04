
import { OnAddedToDepartment } from "../events/OnAddedToDepartment";
import { History, NewHistory } from "../models/History";
import IHistoryRepository from "../repositoryInterfaces/IHistoryRepository";
import IHistoryService from "./IHistoryService";


class HistoryService implements IHistoryService {
  // Repository
  Repository: IHistoryRepository;

  constructor(repository: IHistoryRepository) {
    this.Repository = repository;
  }

  async createHistory(event: OnAddedToDepartment): Promise<History> {
    const newHistory = {
      ...event,
    } as NewHistory;

    const result = await this.Repository.createHistory(newHistory);
    return result;
  }
}

export default HistoryService;
