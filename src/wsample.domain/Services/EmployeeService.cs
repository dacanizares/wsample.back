using wsample.domain.Infrastructure;
using wsample.domain.Models;

namespace wsample.domain.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IDepartmentService _departmentService;

        public EmployeeService(IEmployeeRepository employeeRepository, IDepartmentService departmentService)
        {
            _employeeRepository = employeeRepository;
            _departmentService = departmentService;
        }

        public async Task<int?> CreateEmployeeAsync(Employee newEmployee)
        {
            return await _employeeRepository.CreateEmployeeAsync(newEmployee);
        }
        public async Task<bool> ToggleEmployeeStatusAsync(int employeeId, bool active)
        {
            var storedEmployee = await _employeeRepository.FindEmployeeByIdAsync(employeeId);
            if (storedEmployee == null)
            {
                return false;
            }

            storedEmployee.Active = active;

            await _employeeRepository.UpdateEmployeeAsync(storedEmployee);
            return true;
        }
        public async Task<bool> AddEmployeeToDepartmentAsync(int employeeId, int departmentId)
        {
            var storedEmployee = await _employeeRepository.FindEmployeeByIdAsync(employeeId);
            if (storedEmployee == null)
            {
                return false;
            }
            if (storedEmployee.DepartmentId == departmentId)
            {
                return true;
            }

            var storedDepartment = await _departmentService.FindDepartmentByIdAsync(departmentId);
            if (storedDepartment == null)
            {
                return false;
            }

            storedEmployee.DepartmentId = departmentId;
            //TODO event
            await _employeeRepository.UpdateEmployeeAsync(storedEmployee);
            return true;
        }
        public async Task<bool> UpdateEmployeeAsync(Employee updateEmployee)
        {
            var storedEmployee = await _employeeRepository.FindEmployeeByIdAsync(updateEmployee.Id);
            if (storedEmployee == null)
            {
                return false;
            }
            //TODO map update and stored
            //updateEmployee.Active ??= storedEmployee.Active;
            updateEmployee.FirstName ??= storedEmployee.FirstName;
            updateEmployee.LastName ??= storedEmployee.LastName;
            updateEmployee.HireDate ??= storedEmployee.HireDate;
            updateEmployee.Phone ??= storedEmployee.Phone;
            updateEmployee.Address ??= storedEmployee.Address;
            updateEmployee.AvatarUrl ??= storedEmployee.AvatarUrl;
            //updateEmployee.DepartmentId ??= storedEmployee.DepartmentId;

            await _employeeRepository.UpdateEmployeeAsync(updateEmployee);
            return true;
        }
        public async Task DeleteEmployeeAsync(int id)
        {
            await _employeeRepository.DeleteEmployeeAsync(id);
        }
    }
}
