import { History } from '../domain/models/History';

interface IHistoryViewModel extends Omit<History, 'id'> { }

export class HistoryViewModel implements IHistoryViewModel {
  employeeId: number = -1;
  departmentId: number = -1;
  date: Date = new Date();
}
