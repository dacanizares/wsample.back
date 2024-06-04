import DepartmentService from "../domain/services/DepartmentService";
import IDepartmentService from "../domain/services/IDepartmentService";
import EmployeeService from "../domain/services/EmployeeService";
import IEmployeeService from "../domain/services/IEmployeeService";
import DeparmentRepository from "../repositories/DepartmentRepository";
import EmployeeRepository from "../repositories/EmployeeRepository";

type dependencies = 'IEmployeeService' | 'IDepartmentService'

export function getDependecy<T>(type: dependencies): T {
  switch(type) {
    case 'IEmployeeService':
      return new EmployeeService(
        new EmployeeRepository, 
        getDependecy<IDepartmentService>('IDepartmentService')
      ) as T

    case 'IDepartmentService':
      return new DepartmentService(
        new DeparmentRepository
      ) as T
  }
}
