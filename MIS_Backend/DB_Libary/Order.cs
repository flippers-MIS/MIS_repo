namespace DB_Libary;

public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public int PaperId { get; set; }
    public int PrinterId { get; set; }
    public string ProductName { get; set; } = null!;
    public string Title { get; set; } = null!;
    public int Binding { get; set; }
    public int FormatL { get; set; }
    public int FormatB { get; set; }
    public int endFormatL { get; set; }
    public int endFormatB { get; set; }
    public int Pages { get; set; }
    public int Gap { get; set; }
    public int Nutzen { get; set; }
    public int NutzenM { get; set; }
    public string Trimming { get; set; } = null!;
    public int ShippingCost { get; set; }
    public int PaperPages { get; set; }
    public int Schoen { get; set; }
    public int Wider { get; set; }
    public string MaterialName { get; set; } = null!;
    public int Batch1 { get; set; }
    public string? BatchInformation1 { get; set; }
    public double PriceManuell1 { get; set; }
    public double Price1 { get; set; }
    public int Batch2 { get; set; }
    public string? BatchInformation2 { get; set; }
    public double PriceManuell2 { get; set; }
    public double Price2 { get; set; }
    public int Batch3 { get; set; }
    public string? BatchInformation3 { get; set; }
    public double PriceManuell3 { get; set; }
    public double Price3 { get; set; }
    public int Discount { get; set; }
    public string Date { get; set; } = null!;
    // Navigation Properties
    public Customer Customer { get; set; } = null!;
    public Printer Printer { get; set; } = null!;
    public Paper Paper { get; set; } = null!;
    public PostProcessing? PostProcessing { get; set; }
}
