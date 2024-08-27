using wsample.domain.Models;

namespace wsample.domain.Infrastructure
{
    public interface IHistoryRepository
    {
        public Task<History> CreateHistoryAsync(History newHistory);
    }
}
