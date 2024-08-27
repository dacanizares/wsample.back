using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using wsample.api.Commands;
using wsample.api.Queries;
using wsample.api.ViewModels;
using wsample.domain.Models;
using wsample.domain.Services;

namespace wsample.api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeQueries _queries;
        private readonly IEmployeeService _service;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeQueries queries, IEmployeeService service, IMapper mapper)
        {
            _queries = queries;
            _service = service;
            _mapper = mapper;
        }


        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> GetAll()
        {
            return await _queries.FindEmployeesAsync();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<EmployeeViewModel>> GetByIdAsync(int id)
        {
            var result = await _queries.FindEmployeeByIdAsync(id);
            if (result is null)
            { 
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> CreateEmployee(CreateEmployeeCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Employee newEmployee = _mapper.Map<Employee>(command);
            var newId = await _service.CreateEmployeeAsync(newEmployee);
            
            return Ok(await _queries.FindEmployeeByIdAsync((int)newId));
        }

        [HttpPost("togglestatus")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> ToggleStatus(ToggleEmployeeStatusCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _service.ToggleEmployeeStatusAsync(command.Id, command.Active);
            if (!result)
            {
                return NotFound();
            }

            return Ok(await _queries.FindEmployeeByIdAsync(command.Id));
        }

        [HttpPost("addtodepartment")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> AddToDepartment(AddEmployeeToDepartmentCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _service.AddEmployeeToDepartmentAsync(command.EmployeeId, command.DepartmentId);
            if (!result)
            {
                return NotFound();
            }

            return Ok(await _queries.FindEmployeeByIdAsync(command.EmployeeId));
        }

        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> UpdateEmployee(UpdateEmployeeCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Employee updatedEmployee = _mapper.Map<Employee>(command);
            var result = await _service.UpdateEmployeeAsync(updatedEmployee);
            if (!result)
            {
                return NotFound();
            }

            return Ok(await _queries.FindEmployeeByIdAsync(command.Id));
        }

        [HttpDelete]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> DeleteEmployee(DeleteEmployeeCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _service.DeleteEmployeeAsync(command.Id);
            return Ok();
        }
    }
}
