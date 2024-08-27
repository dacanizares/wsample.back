namespace wsample.api.ViewModels
{
    public class EmployeeViewModel
    {
        public int Id { get; set; }
        public bool Active { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime? HireDate { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? AvatarUrl { get; set; }
        public int? DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
    }
}
