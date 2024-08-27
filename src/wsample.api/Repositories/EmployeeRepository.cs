using wsample.api.Context;
using Dapper;
using System.Data;
using wsample.domain.Infrastructure;
using wsample.domain.Models;

namespace wsample.api.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DbContext _context;

        public EmployeeRepository(DbContext context)
        {
            _context = context;
        }

        public async Task<Employee?> FindEmployeeByIdAsync(int id)
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
                var department = await connection.QuerySingleOrDefaultAsync<Employee?>(query, parameters); // TODO
                return department;
            }
        }
        public async Task<Employee?> FindEmployeesAsync()
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
                var department = await connection.QuerySingleOrDefaultAsync<Employee?>(query, parameters); // TODO
                return department;
            }
        }
    }
}
