using CustomersDb;

namespace MIS_Backend.Services;
public class ProductService(DatabaseContext db)
{
    //Printer
    public List<Printer> GetAllPrinter()
        => db.Printers.OrderBy(p => p.Name).ToList();

    public Printer GetPrinterById(int id)
        => db.Printers.Where(p => p.Id == id).First();

    public Printer AddPrinter(Printer printer)
    {
        db.Printers.Add(printer);
        db.SaveChanges();
        return printer;
    }

    public Printer UpdatePrinter(int id, Printer updatedPrinter)
    {
        var oldPrinter = db.Printers.Where(p => p.Id == id).First();

        oldPrinter.Name = updatedPrinter.Name;
        oldPrinter.FormatWidth = updatedPrinter.FormatWidth;
        oldPrinter.FormatLength = updatedPrinter.FormatLength;
        oldPrinter.FormatName = updatedPrinter.FormatName;
        oldPrinter.BuyPrinceFor4cKlick = updatedPrinter.BuyPrinceFor4cKlick;
        oldPrinter.BuyPrinceFor1cKlick = updatedPrinter.BuyPrinceFor1cKlick;
        oldPrinter.SellPriceFor4cKlick = updatedPrinter.SellPriceFor4cKlick;
        oldPrinter.SellPriceFor1cKlick = updatedPrinter.SellPriceFor1cKlick;
        oldPrinter.UnprintedEdgeMM = updatedPrinter.UnprintedEdgeMM;

        db.SaveChanges();
        return updatedPrinter;
    }

    public void DeletePrinter(int id)
    {
        db.Printers.Remove(GetPrinterById(id));
        db.SaveChanges();
    }

    //Paper
    public List<Paper> GetAllPapers()
        => db.Papers.OrderBy(p => p.Name).ToList();

    public Paper GetPaperById(int id)
        => db.Papers.Where(p => p.Id == id).First();

    public Paper AddPaper(Paper paper)
    {
        db.Papers.Add(paper);
        db.SaveChanges();
        return paper;
    }

    public Paper UpdatePaper(int id, Paper updatedPaper)
    {
        var oldPaper = db.Papers.Where(p => p.Id == id).First();

        oldPaper.Name = updatedPaper.Name;
        oldPaper.BuyPrice = updatedPaper.BuyPrice;
        oldPaper.SellPrice = updatedPaper.SellPrice;
        oldPaper.Notes = updatedPaper.Notes;

        db.SaveChanges();
        return updatedPaper;
    }

    public void DeletePaper(int id)
    {
        db.Papers.Remove(GetPaperById(id));
        db.SaveChanges();
    }
}
