using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RESTApi.Models;

public partial class Tool
{
    [Key]
    public int ToolId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string ToolName { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string Category { get; set; } = null!;

    public bool ToolStatus { get; set; }

    [InverseProperty("Tool")]
    public virtual ICollection<Record> Records { get; set; } = new List<Record>();
}
