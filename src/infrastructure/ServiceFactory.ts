import DepartmentService from "../domain/services/DepartmentService";
import IDepartmentService from "../domain/services/IDepartmentService";
import EmployeeService from "../domain/services/EmployeeService";
import DeparmentRepository from "../repositories/DepartmentRepository";
import EmployeeRepository from "../repositories/EmployeeRepository";
import HistoryService from "../domain/services/HistoryService";
import HistoryRepository from "../repositories/HistoryRepository";

type dependencies = 'IEmployeeService' | 'IDepartmentService' | 'IHistoryService'

function getDependecy<T>(type: dependencies): T {
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

    case 'IHistoryService':
      return new HistoryService(
        new HistoryRepository
      ) as T
  }
}

export default getDependecy;
