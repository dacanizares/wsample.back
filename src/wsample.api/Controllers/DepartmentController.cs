using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using wsample.api.Queries;
using wsample.api.ViewModels;
using wsample.domain.Models;
using wsample.domain.Services;

namespace wsample.api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentQueries _queries;

        public DepartmentController(IDepartmentQueries queries)
        {
            _queries = queries;
        }


        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<DepartmentViewModel>>> GetAll()
        {
            return await _queries.FindDepartmentsAsync();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<DepartmentViewModel>> GetByIdAsync(int id)
        {
            var result = await _queries.FindDepartmentByIdAsync(id);
            if (result is null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}
