namespace MIS_Database;

public partial class Printer
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public double FormatWidth { get; set; }

    public double FormatLength { get; set; }

    public string FormatName { get; set; } = null!;

    public double BuyPrinceFor4cKlick { get; set; }

    public double BuyPrinceFor1cKlick { get; set; }

    public double SellPriceFor4cKlick { get; set; }

    public double SellPriceFor1cKlick { get; set; }

    public double UnprintedEdgeMm { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<PostProcessing> PostProcessings { get; set; } = new List<PostProcessing>();

    public virtual ICollection<PrinterPaper> PrinterPapers { get; set; } = new List<PrinterPaper>();
}
