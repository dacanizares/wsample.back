using wsample.api.Context;
using Dapper;
using System.Data;
using System.Net;
using wsample.api.ViewModels;

namespace wsample.api.Queries
{
    public class EmployeeQueries
    {
        private readonly DbContext _context;

        public EmployeeQueries(DbContext context)
        {
            _context = context;            
        }

        public async Task<Response<EmployeeViewModel?>> FindEmployeeByIdAsync(int id)
        {
            var query = @"
                SELECT
                    Id,
                    Active,
                    FirstName,
                    LastName,
                    HireDate,
                    Phone,
                    Address,
                    AvatarUrl,
                    DepartmentId,
                    CreationDate,
                    ModificationDate
                FROM Employees
                WHERE Id = @Id
            ";

            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                var employee = await connection.QueryFirstOrDefaultAsync<EmployeeViewModel>(query, parameters);

                if (employee != null)
                {
                    return new Response<EmployeeViewModel> { Content = employee };
                }
                return new Response<EmployeeViewModel> { StatusCode = HttpStatusCode.NotFound };
            }
        }

        public async Task<Response<List<EmployeeViewModel>>> FindDepartmentsAsync()
        {
            var query = @"
                SELECT
                    Id,
                    Name,
                    CreationDate,
                    ModificationDate
                FROM Departments
            ";

            var parameters = new DynamicParameters();

            using (var connection = _context.CreateConnection())
            {
                var employees = await connection.QueryAsync<EmployeeViewModel>(query, parameters);
                var content = employees.ToList();

                if (content.Count > 0)
                {
                    return new Response<List<EmployeeViewModel>> { Content = content };
                }
                return new Response<List<EmployeeViewModel>> { StatusCode = HttpStatusCode.NotFound };
            }
        }
    }
}
