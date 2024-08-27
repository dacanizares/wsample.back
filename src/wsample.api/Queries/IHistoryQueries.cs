using wsample.api.ViewModels;

namespace wsample.api.Queries
{
    public interface IHistoryQueries
    {
        Task<List<HistoryViewModel>> FindHistoryByEmployeeIdAsync(int employeeId);
    }
}