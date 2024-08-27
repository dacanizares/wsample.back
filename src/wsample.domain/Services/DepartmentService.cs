using wsample.domain.Infrastructure;
using wsample.domain.Models;

namespace wsample.domain.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        public async Task<Department?> FindDepartmentByIdAsync(int id)
        {
            return await _departmentRepository.FindDepartmentByIdAsync(id);
        }
    }
}
