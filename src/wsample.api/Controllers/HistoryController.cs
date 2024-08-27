using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using wsample.api.Queries;
using wsample.api.ViewModels;
using wsample.domain.Models;

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
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<HistoryViewModel>>> GetByIdAsync(int employeeId)
        {
            return await _queries.FindHistoryByEmployeeIdAsync(employeeId);
        }
    }
}
