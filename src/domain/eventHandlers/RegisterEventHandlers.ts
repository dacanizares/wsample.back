import getDependecy from "../../infrastructure/ServiceFactory";
import { subscribeToOnAddedToDepartment } from "../events/OnAddedToDepartment";
import IHistoryService from "../services/IHistoryService";
import HandleEmployeeDepartmentHistory from "./EmployeeDepartmentHistory";

function registerEventHandlers() {
  // Create event handler
  const employeeDepartmentHistory = new HandleEmployeeDepartmentHistory(
    getDependecy<IHistoryService>('IHistoryService')
  );

  // Subscribe to events...
  subscribeToOnAddedToDepartment(employeeDepartmentHistory);
}

export default registerEventHandlers;
