using wsample.domain.Models;

namespace wsample.domain.Infrastructure
{
    public interface IEmployeeRepository
    {
        public Task<Employee?> FindEmployeeByIdAsync(int id);
        public Task UpdateEmployeeAsync(Employee updateEmployee);
        public Task<int> CreateEmployeeAsync(Employee newEmployee);
        public Task DeleteEmployeeAsync(int id);
    }
}
