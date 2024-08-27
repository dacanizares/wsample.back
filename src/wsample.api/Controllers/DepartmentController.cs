using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using wsample.domain.Models;

namespace wsample.api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult> GetAll()
        {
            return Ok("OK");
        }
    }
}
