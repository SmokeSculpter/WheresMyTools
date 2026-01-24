using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RESTApi.Models;
using RESTApi.Views;

namespace RESTApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        // Add context
        private readonly AppDbContext _context;
        public DataController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("Tools")]
        public async Task<ActionResult<List<Tool>>> GetAllTools()
        {
            return Ok(
                await _context.Tools.ToListAsync()
                );
        }

        [HttpGet("Records")]
        public async Task<ActionResult<List<RecordView>>> GetAllRecords()
        {
            return Ok(
                    await _context.Records.Select(record => new RecordView
                    {
                        RecordId = record.RecordId,
                        DateCheckedIn = record.DateCheckedIn,
                        DateCheckedOut = record.DateCheckedOut,
                        ToolId = record.ToolId,
                        ToolName = record.Tool.ToolName,
                        EmployeeId = record.EmployeeId,
                        EmployeeName = record.Employee.FirstName + " " + record.Employee.LastName,
                        EmployeePosition = record.Employee.Position,
                    }
                ).OrderBy(record => record.EmployeeName).ToListAsync());
        }

        [HttpGet("Employee")]
        public async Task<ActionResult> GetEmployees()
        {
            return Ok(
                    await _context.Records
                        .Where(x => x.DateCheckedIn == null)
                        .GroupBy(x => x.Employee.FirstName)
                        .Select(x => new
                        {
                            Name = x.Where(y => y.Employee.FirstName == x.Key).Select(em => em.Employee.FirstName).FirstOrDefault(),
                            Tools = x.Select(x => new
                            {
                                Name = x.Tool.ToolName,
                                Status = x.Tool.ToolStatus,
                                CheckedOut = x.DateCheckedOut
                            }
                            )
                        }).ToListAsync()
                );
        }
    }
}
