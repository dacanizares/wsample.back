using System.ComponentModel.DataAnnotations;

namespace wsample.api.Commands
{
    public class AddEmployeeToDepartmentCommand
    {
        [Required]
        public int EmployeeId{ get; set; }
        [Required]
        public int DepartmentId { get; set; }
    }
}
