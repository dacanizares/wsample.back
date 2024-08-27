using Microsoft.AspNetCore.Mvc;
using wsample.api.Queries;
using wsample.api.ViewModels;

namespace wsample.api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryQueries _queries;

        public HistoryController(IHistoryQueries queries)
        {
            _queries = queries;
        }

        [HttpGet("{employeeId}")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<HistoryViewModel>>> GetByIdAsync(int employeeId)
        {
            return await _queries.FindHistoryByEmployeeIdAsync(employeeId);
        }
    }
}
