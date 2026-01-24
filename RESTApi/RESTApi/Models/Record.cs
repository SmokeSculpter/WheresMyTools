using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RESTApi.Models;

public partial class Record
{
    [Key]
    public int RecordId { get; set; }

    public DateOnly DateCheckedOut { get; set; }

    public DateOnly? DateCheckedIn { get; set; }

    [Column("ToolID")]
    public int ToolId { get; set; }

    [Column("EmployeeID")]
    public int EmployeeId { get; set; }

    [ForeignKey("EmployeeId")]
    [InverseProperty("Records")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("ToolId")]
    [InverseProperty("Records")]
    public virtual Tool Tool { get; set; } = null!;
}
