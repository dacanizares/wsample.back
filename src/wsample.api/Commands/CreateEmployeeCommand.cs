using System.ComponentModel.DataAnnotations;

namespace wsample.api.Commands
{
    public class CreateEmployeeCommand
    {
        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;
        public DateTime? HireDate { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
