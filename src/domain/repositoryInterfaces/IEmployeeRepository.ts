import { Employee, NewEmployee, UpdatedEmployee } from "../models/Employee";

interface IEmployeeRepository {
  findEmployeeById(id: number) : Promise<Employee | undefined>;
  updateEmployee(id: number, employee: UpdatedEmployee): Promise<Employee>;
  createEmployee(employee: NewEmployee): Promise<Employee>;
  deleteEmployee(id: number): Promise<Employee | undefined>;
}

export default IEmployeeRepository;
