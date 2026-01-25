using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RESTApi.Models;
using RESTApi.Views;

namespace RESTApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewController : ControllerBase
    {
        // Inject context
        private readonly AppDbContext _context;
        public ViewController(AppDbContext context)
        {
            _context = context;
        }


        /// <summary>
        ///     Get method to supply client with required data to load page.
        /// </summary>
        /// <returns>
        ///     Returns status 200 and a OnPageLoadView object containing a list of all tools and a list of all employees
        /// </returns>
        [HttpGet("LoadData")]
        public async Task<ActionResult<OnPageLoadView>> Get_Tools_And_Employees()
        {
            var tools = await _context.Tools.ToListAsync();

            var employees = await _context.Employees.ToListAsync();

            var data = new OnPageLoadView(tools, employees);

            return Ok(data);
        }

        /// <summary>
        ///     Get method to supply a list of records to the client
        /// </summary>
        /// <returns>
        ///     Returns status 200 and a list of RecordView objects containg record information
        /// </returns>
        [HttpGet("Records")]
        public async Task<ActionResult<List<RecordView>>> Get_All_Records()
        {
            var records = await _context.Records.Select(record => new RecordView 
            { 
                RecordId = record.RecordId,
                DateCheckedIn = record.DateCheckedIn,
                ToolId = record.Tool.ToolId,
                ToolName = record.Tool.ToolName,
                ToolCategory = record.Tool.Category,
                EmployeeId = record.Employee.EmployeeId,
                EmployeeName = record.Employee.FirstName + " " + record.Employee.LastName,
                EmployeePosition = record.Employee.Position

            }).ToListAsync();

            return Ok(records);
        }

        /// <summary>
        ///     Get method to return a view that contains a list of tools under a certain employee
        /// </summary>
        /// <returns>
        ///     Returns status code 200 and a list of employees and all the tools they've checked out
        /// </returns>
        [HttpGet("EmployeeTools")]
        public async Task<ActionResult> GetEmployees()
        {
            return Ok(
                    await _context.Records
                        .Where(x => x.DateCheckedIn == null)
                        .GroupBy(x => x.Employee.EmployeeId)
                        .Select(x => new
                        {
                            Name = x.Where(y => y.Employee.EmployeeId == x.Key).Select(em => em.Employee.FirstName + " " + em.Employee.LastName).FirstOrDefault(),
                            Position = x.Where(y => y.Employee.EmployeeId == x.Key).Select(em => em.Employee.Position).FirstOrDefault(),
                            Tools = x.Select(x => new
                            {
                                Name = x.Tool.ToolName,
                                x.Tool.Category,
                                Status = x.Tool.ToolStatus,
                                CheckedOut = x.DateCheckedOut
                            }
                            )
                        }).ToListAsync()
                );
        }

        [HttpPut("CheckIn/{id}")]
        public async Task<IActionResult> Check_Tool_In(int id)
        {
            var tool = await _context.Tools.FindAsync(id);
            var record = await _context.Records.Where(x => x.Tool.ToolId == id).FirstOrDefaultAsync();

            if (tool == null)
                return BadRequest();

            tool.ToolStatus = true;
            record.DateCheckedIn = new DateOnly();

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
