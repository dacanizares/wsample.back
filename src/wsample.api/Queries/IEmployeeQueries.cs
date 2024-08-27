using wsample.api.ViewModels;

namespace wsample.api.Queries
{
    public interface IEmployeeQueries
    {
        Task<EmployeeViewModel?> FindEmployeeByIdAsync(int id);
        Task<List<EmployeeViewModel>> FindEmployeesAsync();
    }
}