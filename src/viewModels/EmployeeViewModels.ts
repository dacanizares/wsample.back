import { Employee } from '../domain/models/Employee';

interface IEmployeeViewModel extends Omit<Employee, 'creationDate' | 'modificationDate'> { }

export class EmployeeViewModel implements IEmployeeViewModel {
  id: number = 0;
  active: number = 0;
  firstName: string = '';
  lastName: string = '';
  hireDate: Date | null = null;
  phone: string | null = null;
  address: string | null = null;
  avatarUrl: string | null = null;
}
