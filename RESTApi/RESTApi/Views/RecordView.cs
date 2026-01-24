using System.ComponentModel.DataAnnotations.Schema;

namespace RESTApi.Views
{
    public class RecordView
    {
        public int RecordId { get; set; }

        public DateOnly DateCheckedOut { get; set; }

        public DateOnly? DateCheckedIn { get; set; }

        public int ToolId { get; set; }

        public string ToolName { get; set; }

        public string ToolCategory { get; set; }

        public int EmployeeId { get; set; }

        public string EmployeeName { get; set; }

        public string EmployeePosition { get; set; }

    }
}
