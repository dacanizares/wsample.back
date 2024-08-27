using wsample.api.Context;
using wsample.api.ViewModels;
using Dapper;
using System.Data;

namespace wsample.api.Queries
{
    public class HistoryQueries : IHistoryQueries
    {
        private readonly DbContext _context;

        public HistoryQueries(DbContext context)
        {
            _context = context;
        }

        public async Task<List<HistoryViewModel>> FindHistoryByEmployeeIdAsync(int employeeId)
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
                var content = await connection.QueryAsync<HistoryViewModel>(query, parameters);
                var histories = content.ToList();

                return histories;
            }
        }
    }
}
