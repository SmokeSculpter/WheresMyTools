using RESTApi.Models;

namespace RESTApi.Views
{
    public class OnPageLoadView
    {
        public List<Tool> Tools { get; set; }

        public List<Employee> Employees { get; set; }

        public OnPageLoadView(List<Tool> tools, List<Employee> employees)
        {
            Tools = tools;
            Employees = employees;
        }
    }
}
