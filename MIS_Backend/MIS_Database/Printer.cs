namespace MIS_Database;

public class Printer
{
    public required int Id { get; init; }
    public required string Name { get; set; }
    public required double FormatWidth { get; set; }
    public required double FormatLength { get; set; }
    public string FormatWidthXLength => $"{FormatWidth}x{FormatLength}";
    public required string FormatName { get; set; }
    public required double BuyPrinceFor4cKlick { get; set; }        //einkaufspreis pro farbigen klick
    public required double BuyPrinceFor1cKlick { get; set; }     //einkaufspreis pro schwarzweiss klick
    public required double SellPriceFor4cKlick { get; set; }       //preis pro farbigen klick
    public required double SellPriceFor1cKlick { get; set; }       //preis pro schwarzweiss klick
    public required double UnprintedEdgeMM { get; set; }

    private Printer() { }

    public static Printer Parse(string line)
    {
        string[] parts;
        try
        {
          parts = line.Split(',');
        }
        catch (Exception e)
        {
            throw new Exception($"Error parsing line: {line}", e);
        }

        //id,  name,  format_width,format_length,format_name, buyPrinceFor4cKlick, buyPrinceFor1cKlick, sellPriceFor4cKlick, sellPriceFor1cKlick, unprintedEdgeMM
        //1, Printer444, 78.0,            22.0,        A2,          0.002,                0.001,                 0.1,              0.05,                  5.0

        return new Printer
        {
            Id = int.Parse(parts[0]),
            Name = parts[1],
            FormatWidth = double.Parse(parts[2]),
            FormatLength = double.Parse(parts[3]),
            FormatName = parts[3],
            BuyPrinceFor4cKlick = double.Parse(parts[4]),
            BuyPrinceFor1cKlick = double.Parse(parts[5]),
            SellPriceFor4cKlick = double.Parse(parts[6]),
            SellPriceFor1cKlick = double.Parse(parts[7]),
            UnprintedEdgeMM = double.Parse(parts[8]),
        };
    }
}
