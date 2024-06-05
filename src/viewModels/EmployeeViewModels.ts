import { Employee } from '../domain/models/Employee';

interface IEmployeeViewModel extends Omit<Employee, 'creationDate' | 'modificationDate' | 'id'> { }

export class EmployeeViewModel implements IEmployeeViewModel {  
  id: number | null = 0;
  active: number = 0;
  firstName: string = '';
  lastName: string = '';
  hireDate: Date | null = null;
  phone: string | null = null;
  address: string | null = null;
  avatarUrl: string | null = null;
  departmentId: number | null = null;
  departmentName?: string | null = null;
}
