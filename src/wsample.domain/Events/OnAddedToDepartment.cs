using MediatR;
using wsample.domain.Services;

namespace wsample.domain.Events
{
    public class OnAddedToDepartmentEvent : IRequest 
    {
        public int EmployeeId { get; set; }
        public int DepartmentId { get; set; }
    }

    public class OnAddedToDepartmentHandler : IRequestHandler<OnAddedToDepartmentEvent>
    {
        private readonly IHistoryService _historyService;

        public OnAddedToDepartmentHandler(IHistoryService historyService)
        {
            _historyService = historyService;
        }
        public async Task Handle(OnAddedToDepartmentEvent request, CancellationToken cancellationToken)
        {
            await _historyService.CreateHistoryAsync(new Models.History { EmployeeId = request.EmployeeId, DepartmentId = request.DepartmentId });
        }
    }
}
