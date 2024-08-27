using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using wsample.api.ViewModels;
using wsample.domain.Models;

namespace wsample.api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<DepartmentViewModel>>> GetAll()
        {
            return NoContent();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<DepartmentViewModel>> GetByIdAsync(string id)
        {
            return NoContent();
        }
    }
}
