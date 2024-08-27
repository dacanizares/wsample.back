using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using System.Net;
using wsample.api.Commands;
using wsample.test.Infrastructure;
using Newtonsoft.Json;
using wsample.api.ViewModels;

namespace wsample.test
{
    public class DepartmentFunctionalTests :
        IClassFixture<CustomWebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private readonly CustomWebApplicationFactory<Program>
            _factory;

        public DepartmentFunctionalTests(
            CustomWebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _client = factory.CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false
            });
        }

        [Fact]
        [Trait("Functional", "true")]
        public async Task CreateEmployee_OK()
        {
            // Prepare
            var command = new CreateEmployeeCommand
            {
                FirstName = "Test",
                LastName = "User",
                HireDate = DateTime.Now,
                Phone = "911",
                Address = "Nowhere",
                AvatarUrl = null
            };

            // Execute
            var response = await _client.PostAsJsonAsync("employee/", command);
            var result = JsonConvert.DeserializeObject<EmployeeViewModel>(
                await response.Content.ReadAsStringAsync()
            );

            // Check
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotEqual(0, result.Id);
            Assert.Equal(command.FirstName, result.FirstName);
            Assert.Equal(command.LastName, result.LastName);
            Assert.Equal(command.Phone, result.Phone);
            Assert.Equal(command.Address, result.Address);
            Assert.Equal(command.AvatarUrl, result.AvatarUrl);
        }
    }
}
