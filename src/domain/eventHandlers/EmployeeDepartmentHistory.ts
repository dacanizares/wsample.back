import { OnAddedToDepartment, OnAddedToDepartmentHandler } from '../events/OnAddedToDepartment'
import IHistoryService from '../services/IHistoryService'

class HandleEmployeeDepartmentHistory implements OnAddedToDepartmentHandler {
  // Repository
  Service: IHistoryService;

  constructor(service: IHistoryService) {
    this.Service = service;
  }

  handle = async (event: OnAddedToDepartment): Promise<void> =>  {
    await this.Service.createHistory(event);
  }
}

export default HandleEmployeeDepartmentHistory;
