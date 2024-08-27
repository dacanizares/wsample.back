using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using wsample.api.Commands;
using wsample.api.ViewModels;
using wsample.domain.Models;

namespace wsample.api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> GetAll()
        {
            return NoContent();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<EmployeeViewModel>> GetByIdAsync(string id)
        {
            return NoContent();
        }

        [HttpPost]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> CreateEmployee(CreateEmployeeCommand command)
        {
            return NoContent();
        }

        [HttpPost("togglestatus")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> ToggleStatus(ToggleEmployeeStatusCommand command)
        {
            return NoContent();
        }

        [HttpPost("addtodepartment")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> AddToDepartment(AddEmployeeToDepartmentCommand command)
        {
            return NoContent();
        }

        [HttpPut]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> UpdateEmployee(UpdateEmployeeCommand command)
        {
            return NoContent();
        }

        [HttpDelete]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> DeleteEmployee(DeleteEmployeeCommand command)
        {
            return NoContent();
        }
    }
}
