namespace DB_Libary;

public class Paper
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public double BuyPrice { get; set; }
    public double SellPrice { get; set; }
    public string Brand { get; set; } = null!;
    public double FormatWidth { get; set; }
    public double FormatLength { get; set; }

    public double Grammatur { get; set; }
    public double Volume { get; set; }
    public int Amount { get; set; } = 0;
    public double PricePerKg { get; set; }
    public double Kg { get; set; }
    public double CalcPricePerKg => PricePerKg * Kg;                //Bogenpreis in der alten Software. Formel gehört geänder!!!
    public double StapelHöheMM { get; set; }
    public double Bogen => Volume / (FormatWidth * FormatLength);   //Bg. in der alten Software. Formel gehört geänder!!!

    //public string? Notes { get; set; }
    //public Printer Printer { get; set; } = null!;
}

