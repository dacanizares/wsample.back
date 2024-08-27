using Microsoft.Data.SqlClient;
using System.Data;

namespace wsample.api.Context
{
    public class DbContext
    {
        private readonly IConfiguration _configuration = null!;
        private readonly string _connectionString = null!;

        public DbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);
    }
}
