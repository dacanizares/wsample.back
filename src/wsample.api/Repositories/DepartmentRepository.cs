using wsample.api.Context;
using Dapper;
using System.Data;
using wsample.domain.Infrastructure;
using wsample.domain.Models;

namespace wsample.api.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly DbContext _context;

        public DepartmentRepository(DbContext context)
        {
            _context = context;
        }

        public async Task<Department?> FindDepartmentByIdAsync(int id)
        {
            var query = @"
                SELECT
                    Id,
                    Name,
                    CreationDate,
                    ModificationDate
                FROM Departments
                WHERE Id = @Id
            ";

            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                var department = await connection.QuerySingleOrDefaultAsync<Department?>(query, parameters);
                return department;
            }
        }
    }
}
