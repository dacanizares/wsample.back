export interface OnAddedToDepartment {
  employeeId: number
  departmentId: number
}

export interface OnAddedToDepartmentHandler {
  handle: (event: OnAddedToDepartment) => Promise<void>
}

const OnAddedToDepartmentHandlers: OnAddedToDepartmentHandler[] = [] 

export function subscribeToOnAddedToDepartment(handler: OnAddedToDepartmentHandler) : void
{
  OnAddedToDepartmentHandlers.push(handler);
}

export function notifyToOnAddedToDepartment(event: OnAddedToDepartment) : void
{
  console.log(`[server]: DOMAIN event OnAddedToDepartment ${event}. Calling ${OnAddedToDepartmentHandlers.length} handlers.`)
  OnAddedToDepartmentHandlers.forEach(async (handler) => {
    await handler.handle(event);
  });
}
