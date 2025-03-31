using DB_Libary;

namespace MIS_Backend.Services;
public class ProductService(DatabaseContext db)
{
    //Printer
    public List<Printer> GetAllPrinter()
    {
        try
        {
            return [.. db.Printers];
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to get all printers.\nError: [{e}]");
        }
    }

    public Printer GetPrinterById(int id)
    {
        try
        {
            return db.Printers.Where(p => p.Id == id).First();
        }
        catch (Exception e)
        {
            throw new Exception($"Printer with id [{id}] not found.\nError: [{e}]");
        }
    }

    public Printer AddPrinter(Printer printer)
    {
        try
        {
            db.Printers.Add(printer);
            db.SaveChanges();
            return printer;
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to add printer.\nError: [{e}]");
        }
    }

    public Printer UpdatePrinter(int id, Printer updatedPrinter)
    {
        try
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
            oldPrinter.Inactive = updatedPrinter.Inactive;

            db.SaveChanges();

            return updatedPrinter;
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to update printer.\nError: [{e}]");
        }
    }

    public void DeletePrinter(int id)
    {
        try
        {
            db.Printers.Remove(GetPrinterById(id));
            db.SaveChanges();
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to delete printer.\nError: [{e}]");

        }
    }

    public int ChangeInactiveValueForPrinter(int id)
    {
        try
        {
            var activePrinter = db.Printers.Where(p => p.Id == id).First();

            activePrinter.Inactive = activePrinter.Inactive == 1 ? 0 : 1;

            db.SaveChanges();

            return activePrinter.Inactive;
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to change inactive value for printer.\nError: [{e}]");
        }
    }

    //Paper
    public List<Paper> GetAllPapers()
    {
        try
        {
            return [.. db.Papers.OrderBy(p => p.Name)];
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to get all papers.\nError: [{e}]");
        }
    }

    public Paper GetPaperById(int id)
    {
        try
        {
            return db.Papers.Where(p => p.Id == id).First();
        }
        catch (Exception e)
        {
            throw new Exception($"Paper with id [{id}] not found.\nError: [{e}]");
        }
    }

    public Paper AddPaper(Paper paper)
    {
        try
        {
            db.Papers.Add(paper);
            db.SaveChanges();
            return paper;
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to add paper.\nError: [{e}]");
        }  
    }

    public Paper UpdatePaper(int id, Paper updatedPaper)
    {
        try
        {
            var oldPaper = db.Papers.Where(p => p.Id == id).First();

            oldPaper.Name = updatedPaper.Name;
            oldPaper.BuyPrice = updatedPaper.BuyPrice;
            oldPaper.SellPrice = updatedPaper.SellPrice;
            oldPaper.Brand = updatedPaper.Brand;
            oldPaper.FormatWidth = updatedPaper.FormatWidth;
            oldPaper.FormatLength = updatedPaper.FormatLength;
            oldPaper.Grammatur = updatedPaper.Grammatur;
            oldPaper.Volume = updatedPaper.Volume;
            oldPaper.Amount = updatedPaper.Amount;
            oldPaper.PricePerKg = updatedPaper.PricePerKg;
            oldPaper.Kg = updatedPaper.Kg;
            oldPaper.CalcPricePerKg = updatedPaper.CalcPricePerKg;
            oldPaper.StapelHöheMM = updatedPaper.StapelHöheMM;
            oldPaper.Bogen = updatedPaper.Bogen;

            db.SaveChanges();
            return updatedPaper;
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to update paper.\nError: [{e}]");
        }
    }

    public void DeletePaper(int id)
    {
        try
        {
            db.Papers.Remove(GetPaperById(id));
            db.SaveChanges();
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to delete paper.\nError: [{e}]");
        }
    }
}
