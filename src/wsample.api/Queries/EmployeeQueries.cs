using wsample.api.Context;
using Dapper;
using System.Data;
using wsample.api.ViewModels;

namespace wsample.api.Queries
{
    public class EmployeeQueries : IEmployeeQueries
    {
        private readonly DbContext _context;

        public EmployeeQueries(DbContext context)
        {
            _context = context;
        }

        public async Task<EmployeeViewModel?> FindEmployeeByIdAsync(int id)
        {
            var query = @"
                SELECT
                    e.Id,
                    e.Active,
                    e.FirstName,
                    e.LastName,
                    e.HireDate,
                    e.Phone,
                    e.Address,
                    e.AvatarUrl,
                    e.DepartmentId,
                    d.Name AS DepartmentName
                FROM Employees e
                LEFT JOIN Departments d ON d.Id = e.DepartmentId
                WHERE e.Id = @Id
            ";

            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                var employee = await connection.QuerySingleOrDefaultAsync<EmployeeViewModel>(query, parameters);
                return employee;
            }
        }

        public async Task<List<EmployeeViewModel>> FindEmployeesAsync()
        {
            var query = @"
                SELECT
                    e.Id,
                    e.Active,
                    e.FirstName,
                    e.LastName,
                    e.HireDate,
                    e.Phone,
                    e.Address,
                    e.AvatarUrl,
                    e.DepartmentId,
                    d.Name AS DepartmentName
                FROM Employees e
                LEFT JOIN Departments d ON d.Id = e.DepartmentId
            ";

            var parameters = new DynamicParameters();

            using (var connection = _context.CreateConnection())
            {
                var content = await connection.QueryAsync<EmployeeViewModel>(query, parameters);
                var employees = content.ToList();
                return employees;
            }
        }
    }
}
