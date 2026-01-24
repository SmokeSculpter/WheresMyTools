using RESTApi.Models;

namespace RESTApi.Views
{
    public class EmployeeView
    {
        public int EmployeeId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Position { get; set; }

        public List<Tool> Tools { get; set; }
    }
}
