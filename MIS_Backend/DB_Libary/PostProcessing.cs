namespace DB_Libary;

public class PostProcessing
{
    public int Id { get; set; } // Primärschlüssel

    public int PrinterId { get; set; } // Referenz zur Maschine, die den Prozess durchführt (verknüpft mit einer `Printer`-Tabelle)

    public string BindingType { get; set; } = string.Empty; // Binding Type

    public string StandardPaperName { get; set; } = string.Empty; // Standard Paper Name

    public double CuttingTime { get; set; } // Schneiden Dauer
    public double CuttingCostEUR { get; set; } // Schneiden Preis in EUR
    public double CuttingStackHeight { get; set; } // Schneiden Stapelhöhe
    public double CuttingLarge { get; set; } // Schneiden Groß
    public double CuttingSmall { get; set; } // Schneiden Klein
    public double CuttingMaxSmallFormat { get; set; } // Schneiden Klein Max Format
    public double CuttingCutContour { get; set; } // Schneiden CutContour

    // Nummernkreise
    public double NumberCircleOffer { get; set; } // Nummernkreis Angebot
    public double NumberCircleCalculation { get; set; } // Nummernkreis Kalkulation
    public double NumberCircleOrder { get; set; } // Nummernkreis Auftrag
    public double NumberCircleService { get; set; } // Nummernkreis Dienstleistung

    // Verknüpfung zu aktiven Benutzern
    public string ActiveUser { get; set; } = string.Empty; // Aktiver Benutzer
    public string ActiveUserRole { get; set; } = string.Empty; // Aktive Benutzer Rolle ID
    public string ActiveUserID { get; set; } = string.Empty; // Aktiver Benutzer ID

    // Zusatzfelder
    public string ProgrammingNote { get; set; } = string.Empty; // Notiz Programmierung
    public string CartonLabels { get; set; } = string.Empty; // Kartonetiketten
    public string LabelPrinterIpAddress { get; set; } = string.Empty; // Etikettendrucker IP
}
