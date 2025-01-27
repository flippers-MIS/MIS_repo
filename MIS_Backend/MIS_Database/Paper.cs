using System;
using System.Collections.Generic;

namespace MIS_Database;

public partial class Paper
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public double BuyPrice { get; set; }

    public double SellPrice { get; set; }

    public string? Notes { get; set; }

    public virtual ICollection<PrinterPaper> PrinterPapers { get; set; } = new List<PrinterPaper>();
}
