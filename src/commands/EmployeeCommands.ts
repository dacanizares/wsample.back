import { Employee } from "../domain/models/Employee";

interface IEmployeeModifiableFields extends Omit<Employee, 'id' | 'active' | 'creationDate' | 'modificationDate' | 'hireDate'> { }

export class CreateEmployeeCommand implements IEmployeeModifiableFields {
  firstName: string = "";
  lastName: string = "";
  hireDate: string | null = null;
  phone: string | null = null;
  address: string | null = null;
  avatarUrl: string | null = null;
}

export class ToggleEmployeeStatusCommand {
  id: number = -1;
  active: number = -1;
}

export class UpdateEmployeeCommand implements IEmployeeModifiableFields {
  id: number = -1;
  firstName: string = "";
  lastName: string = "";
  hireDate: string | null = null;
  phone: string | null = null;
  address: string | null = null;
  avatarUrl: string | null = null;
}

export class DeleteEmployeeCommand {
  id: number = -1;
}

