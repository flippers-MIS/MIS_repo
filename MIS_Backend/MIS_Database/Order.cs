using System;
using System.Collections.Generic;

namespace MIS_Database;

public partial class Order
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public int PrinterId { get; set; }

    public int UserId { get; set; }

    public DateOnly OrderDate { get; set; }

    public int Quantity { get; set; }

    public double TotalPrice { get; set; }

    public string Status { get; set; } = null!;

    public string? Notes { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Printer Printer { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
