using wsample.domain.Models;

namespace wsample.domain.Services
{
    public interface IDepartmentService
    {
        Task<Department?> FindDepartmentByIdAsync(int id);
    }
}