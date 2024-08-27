using MediatR;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wsample.domain.Infrastructure;
using wsample.domain.Models;
using wsample.domain.Services;

namespace wsample.test
{
    public class EmployeeServiceUnitTests
    {
        [Fact]
        public async Task EmployeeNoFound_404()
        {
            // Mock
            var ID = 5;
            var employeeRepo = new Mock<IEmployeeRepository>();
            employeeRepo
                .Setup(r => r.FindEmployeeByIdAsync(ID))
                .ReturnsAsync((Employee)null);
            var departmentService = new Mock<IDepartmentService>();
            var mediator = new Mock<IMediator>();

            // Prepare
            var service = new EmployeeService(
                employeeRepo.Object,
                departmentService.Object,
                mediator.Object
            );

            // Execute
            var result = await service.ToggleEmployeeStatusAsync(ID, 0);

            // Validate
            Assert.False(result);
            employeeRepo.Verify(r => r.FindEmployeeByIdAsync(ID), Times.Exactly(1));
        }
    }
}
