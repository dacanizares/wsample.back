using System.ComponentModel.DataAnnotations;

namespace wsample.api.Commands
{
    public class ToggleEmployeeStatusCommand
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int Active { get; set; }
    }
}
