namespace CustomersDb;
public class Printer
{
    public int Id { get; init; }
    public string Name { get; set; } = string.Empty;
    public double FormatWidth { get; set; }
    public double FormatLength { get; set; }
    public string FormatWidthXLength => $"{FormatWidth}x{FormatLength}";
    public string FormatName { get; set; } = string.Empty;
    public double BuyPrinceFor4cKlick { get; set; }
    public double BuyPrinceFor1cKlick { get; set; }
    public double SellPriceFor4cKlick { get; set; }
    public double SellPriceFor1cKlick { get; set; }
    public double UnprintedEdgeMM { get; set; }
}

