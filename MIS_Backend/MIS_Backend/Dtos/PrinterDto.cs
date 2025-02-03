namespace MIS_Backend.Dtos
{
    public class PrinterDto
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

        public virtual ICollection<OrderDto> Orders { get; set; } = new List<OrderDto>();

        public virtual ICollection<PostProcessingDto> PostProcessings { get; set; } = new List<PostProcessingDto>();

        public virtual ICollection<PrinterPaperDto> PrinterPapers { get; set; } = new List<PrinterPaperDto>();
    }
}
