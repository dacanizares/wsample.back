using wsample.domain.Infrastructure;
using wsample.domain.Models;

namespace wsample.domain.Services
{
    public class HistoryService : IHistoryService
    {
        private readonly IHistoryRepository _historyRepository;

        public HistoryService(IHistoryRepository historyRepository)
        {
            _historyRepository = historyRepository;
        }

        public async Task<int> CreateHistoryAsync(History newHistory)
        {
            // TODO map fields

            return await _historyRepository.CreateHistoryAsync(newHistory);
        }
    }
}
