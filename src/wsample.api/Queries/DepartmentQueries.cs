using wsample.api.Context;
using Dapper;
using System.Data;
using System.Net;
using wsample.api.ViewModels;

namespace wsample.api.Queries
{
    public class DepartmentQueries
    {
        private readonly DbContext _context;

        public DepartmentQueries(DbContext context)
        {
            _context = context;            
        }

        public async Task<DepartmentViewModel?> FindDepartmentByIdAsync(int id)
        {
            var query = @"
                SELECT
                    Id,
                    Name,
                FROM Departments
                WHERE Id = @Id
            ";

            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                var department = await connection.QueryFirstOrDefaultAsync<DepartmentViewModel>(query, parameters);
                return department;
            }
        }

        public async Task<List<DepartmentViewModel>> FindDepartmentsAsync()
        {
            var query = @"
                SELECT
                    Id,
                    Name
                FROM Departments
            ";

            var parameters = new DynamicParameters();

            using (var connection = _context.CreateConnection())
            {
                var content = await connection.QueryAsync<DepartmentViewModel>(query, parameters);
                var departments = content.ToList();

                return departments;
            }
        }
    }
}
