using System;
using System.Collections.Generic;

namespace MIS_Database;

public partial class PrinterPaper
{
    public int Id { get; set; }

    public int PrinterId { get; set; }

    public int PaperId { get; set; }

    public virtual Paper Paper { get; set; } = null!;

    public virtual Printer Printer { get; set; } = null!;
}
