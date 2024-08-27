using wsample.api.Context;
using Dapper;
using System.Data;
using wsample.domain.Infrastructure;
using wsample.domain.Models;

namespace wsample.api.Repositories
{
    public class HistoryRepository : IHistoryRepository
    {
        private readonly DbContext _context;

        public HistoryRepository(DbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateHistoryAsync(History newHistory)
        {
            var query = @"
                INSERT INTO History (EmployeeId, DepartmentId, Date)
                OUTPUT INSERTED.Id
                VALUES (@EmployeeId, @DepartmentId, @Date)
            ";

            var parameters = new DynamicParameters();
            parameters.Add("EmployeeId", newHistory.EmployeeId, DbType.Int32);
            parameters.Add("DepartmentId", newHistory.DepartmentId, DbType.Int32);
            parameters.Add("Date", newHistory.Date, DbType.DateTime);

            using (var connection = _context.CreateConnection())
            {
                var id = await connection.ExecuteScalarAsync<int>(query, parameters);

                return id; //TODO
            }
        }
    }
}
