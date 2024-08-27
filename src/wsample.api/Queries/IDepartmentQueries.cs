using wsample.api.ViewModels;

namespace wsample.api.Queries
{
    public interface IDepartmentQueries
    {
        Task<DepartmentViewModel?> FindDepartmentByIdAsync(int id);
        Task<List<DepartmentViewModel>> FindDepartmentsAsync();
    }
}