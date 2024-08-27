using wsample.api.Context;
using wsample.api.Queries;
using wsample.api.Repositories;
using wsample.domain.Services;
using wsample.domain.Infrastructure;
using wsample.domain.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<DbContext>();

// Services
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IHistoryService, HistoryService>();

// Repositories
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IHistoryRepository, HistoryRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();

// Queries
builder.Services.AddScoped<IEmployeeQueries, EmployeeQueries>();
builder.Services.AddScoped<IHistoryQueries, HistoryQueries>();
builder.Services.AddScoped<IDepartmentQueries, DepartmentQueries>();

builder.Services.AddAutoMapper(typeof(Program));

// Mediatr
builder.Services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssembly(typeof(Department).Assembly);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

app.Run();


// Expose class (More info: https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-8.0)
public partial class Program { }
