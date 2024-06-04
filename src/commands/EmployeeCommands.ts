import { Employee } from "../domain/models/Employee";

interface IEmployeeModifiableFields extends Omit<Employee, 'id' | 'active' | 'creationDate' | 'modificationDate'> { }

export class CreateEmployee implements IEmployeeModifiableFields {
  firstName: string = "";
  lastName: string = "";
  hireDate: Date | null = null;
  phone: string | null = null;
  address: string | null = null;
  avatarUrl: string | null = null;
}

export class ToggleEmployeeStatus {
  id: number = -1;
  active: number = -1;
}

export class DeleteEmployee {
  id: number = -1;
}

