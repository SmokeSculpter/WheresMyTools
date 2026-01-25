namespace RESTApi.DTO
{
    public class CheckOutDTO
    {
        public DateOnly DateCheckedOut { get; set; }
        public DateOnly? DateCheckedIn { get; set; }
        public int ToolId { get; set; }
        public int EmployeeId { get; set; }
    }
}
