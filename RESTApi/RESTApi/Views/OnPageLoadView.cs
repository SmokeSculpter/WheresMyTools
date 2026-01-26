using RESTApi.Models;

namespace RESTApi.Views
{
    public class OnPageLoadView
    {
        public List<ToolView> Tools { get; set; }

        public List<EmployeeView> Employees { get; set; }

        public OnPageLoadView(List<ToolView> tools, List<EmployeeView> employees)
        {
            Tools = tools;
            Employees = employees;
        }
    }
}
