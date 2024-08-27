using wsample.domain.Models;

namespace wsample.domain.Infrastructure
{
    public interface IDepartmentRepository
    {
        public Task<Department?> FindDepartmentByIdAsync(int id);
    }
}
