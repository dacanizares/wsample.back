using wsample.api.Context;
using wsample.api.ViewModels;
using Dapper;
using System.Data;
using System.Net;
using wsample.domain.Models;

namespace wsample.api.Queries
{
    public class HistoryQueries
    {
        private readonly DbContext _context;

        public HistoryQueries(DbContext context)
        {
            _context = context;            
        }

        public async Task<Response<Department>> FindHistoryByEmployeeIdAsync(int employeeId)
        {
            var query = @"
                SELECT
                    h.EmployeeId,
                    h.DepartmentId,
                    h.Date,
                    d.Name AS DepartmentName
                FROM History h
                INNER JOIN Departments d ON d.Id = h.DepartmentId
                WHERE h.EmployeeId = @EmployeeId
                ORDER BY h.Date DESC
            ";

            var parameters = new DynamicParameters();
            parameters.Add("EmployeeId", employeeId, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                var histories = await connection.QueryAsync<Department>(query, parameters);
                var content = histories.ToList();

                if (content.Count > 0)
                {
                    return new Response<Department> { Content = content };
                }
                return new Response<Department> { StatusCode = HttpStatusCode.NotFound };
            }
        }
    }
}
