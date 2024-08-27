using wsample.domain.Models;

namespace wsample.domain.Services
{
    public interface IEmployeeService
    {
        Task<bool> AddEmployeeToDepartmentAsync(int employeeId, int departmentId);
        Task<int> CreateEmployeeAsync(Employee newEmployee);
        Task DeleteEmployeeAsync(int id);
        Task<bool> ToggleEmployeeStatusAsync(int employeeId, int active);
        Task<bool> UpdateEmployeeAsync(Employee updateEmployee);
    }
}
