import { Department } from '../domain/models/Department';

interface IDepartmentViewModel extends Omit<Department, 'creationDate' | 'modificationDate'> { }

export class DepartmentViewModel implements IDepartmentViewModel {
  id: number = -1;
  name: string = ''; 
}
