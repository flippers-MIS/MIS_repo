namespace MIS_Backend.Dtos
{
    public class PaperDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public double BuyPrice { get; set; }

        public double SellPrice { get; set; }

        public string? Notes { get; set; }

        //public virtual ICollection<PrinterPaperDto> PrinterPapers { get; set; } = new List<PrinterPaperDto>();
    }
}
