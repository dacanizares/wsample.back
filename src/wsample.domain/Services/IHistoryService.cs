using wsample.domain.Models;

namespace wsample.domain.Services
{
    public interface IHistoryService
    {
        Task<int> CreateHistoryAsync(History newHistory);
    }
}
