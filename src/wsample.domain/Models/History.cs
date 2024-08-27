namespace wsample.domain.Models
{
    public class History
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int DepartmentId { get; set; }
        public DateTime Date { get; set; }
    }
}
