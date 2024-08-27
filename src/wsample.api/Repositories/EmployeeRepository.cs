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

        public async Task<int> CreateEmployeeAsync(Employee newEmployee)
        {
            var query = @"
                INSERT INTO Employees (Active, FirstName, LastName, HireDate, Phone, Address, AvatarUrl, DepartmentId, CreationDate, ModificationDate)
                OUTPUT INSERTED.Id
                VALUES (@Active, @FirstName, @LastName, @HireDate, @Phone, @Address, @AvatarUrl, @DepartmentId, @CreationDate, @ModificationDate)
            ";

            var parameters = new DynamicParameters();
            parameters.Add("Active", newEmployee.Active, DbType.Boolean);
            parameters.Add("FirstName", newEmployee.FirstName, DbType.String);
            parameters.Add("LastName", newEmployee.LastName, DbType.String);
            parameters.Add("HireDate", newEmployee.HireDate, DbType.DateTime);
            parameters.Add("Phone", newEmployee.Phone, DbType.String);
            parameters.Add("Address", newEmployee.Address, DbType.String);
            parameters.Add("AvatarUrl", newEmployee.AvatarUrl, DbType.String);
            parameters.Add("DepartmentId", newEmployee.DepartmentId, DbType.Int32);
            parameters.Add("CreationDate", DateTime.UtcNow, DbType.DateTime);
            parameters.Add("ModificationDate", DateTime.UtcNow, DbType.DateTime);

            using (var connection = _context.CreateConnection())
            {
                var id = await connection.ExecuteScalarAsync<int>(query, parameters);

                return id;
            }
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            var query = @"
                DELETE FROM Employees
                WHERE Id = @Id
            ";

            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task<Employee?> FindEmployeeByIdAsync(int id)
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
                var employee = await connection.QuerySingleOrDefaultAsync<Employee>(query, parameters);
                return employee;
            }
        }

        public async Task UpdateEmployeeAsync(Employee updateEmployee)
        {
            var query = @"
                UPDATE Employees
                SET Active = @Active, 
                    FirstName = @FirstName,
                    LastName = @LastName,
                    HireDate = @HireDate,
                    Phone = @Phone,
                    Address = @Address,
                    AvatarUrl = @AvatarUrl,
                    DepartmentId = @DepartmentId,
                    ModificationDate = @ModificationDate
                WHERE Id = @Id";

            var parameters = new DynamicParameters();
            parameters.Add("Active", updateEmployee.Active, DbType.Boolean);
            parameters.Add("FirstName", updateEmployee.FirstName, DbType.String);
            parameters.Add("LastName", updateEmployee.LastName, DbType.String);
            parameters.Add("HireDate", updateEmployee.HireDate, DbType.DateTime);
            parameters.Add("Phone", updateEmployee.Phone, DbType.String);
            parameters.Add("Address", updateEmployee.Address, DbType.String);
            parameters.Add("AvatarUrl", updateEmployee.AvatarUrl, DbType.String);
            parameters.Add("DepartmentId", updateEmployee.DepartmentId, DbType.Int32);
            parameters.Add("ModificationDate", DateTime.UtcNow, DbType.DateTime);
            parameters.Add("Id", updateEmployee.Id, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }
    }
}
