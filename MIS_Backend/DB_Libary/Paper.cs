namespace CustomersDb;

public class Paper
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public double BuyPrice { get; set; }
    public double SellPrice { get; set; }
    public string? Notes { get; set; }
    public Printer Printer { get; set; } = null!;
}

