using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using wsample.api.ViewModels;
using wsample.domain.Models;

namespace wsample.api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        [HttpGet("{employeeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<DepartmentViewModel>> GetByIdAsync(string employeeId)
        {
            return NoContent();
        }
    }
}
