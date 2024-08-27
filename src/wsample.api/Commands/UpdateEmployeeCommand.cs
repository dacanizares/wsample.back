using System.ComponentModel.DataAnnotations;

namespace wsample.api.Commands
{
    public class UpdateEmployeeCommand
    {
        [Required]
        public int Id{ get; set; }
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        public DateTime? HireDate { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
