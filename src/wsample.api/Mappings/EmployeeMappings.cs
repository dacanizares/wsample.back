using AutoMapper;
using wsample.api.Commands;
using wsample.domain.Models;

namespace booklibrary.api.Mappings
{
    public class EmployeeMappings : Profile
    {
        public EmployeeMappings()
        {
            CreateMap<Employee, CreateEmployeeCommand>();
            CreateMap<Employee, UpdateEmployeeCommand>();
            CreateMap<Employee, DeleteEmployeeCommand>();

            CreateMap<CreateEmployeeCommand, Employee>();
            CreateMap<UpdateEmployeeCommand, Employee>();
            CreateMap<DeleteEmployeeCommand, Employee>();
        }
    }
}
