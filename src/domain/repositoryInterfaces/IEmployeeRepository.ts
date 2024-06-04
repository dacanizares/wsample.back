import { Employee, NewEmployee, UpdatedEmployee } from "../models/Employee";

interface IEmployeeRepository {
  findEmployeeForUpdateById(id: number) : Promise<UpdatedEmployee | null>;
  updateEmployee(id: number, employee: UpdatedEmployee): Promise<Employee>;
  createEmployee(employee: NewEmployee): Promise<Employee>;
  deleteEmployee(id: number): Promise<Employee | undefined>;
}

export default IEmployeeRepository;
