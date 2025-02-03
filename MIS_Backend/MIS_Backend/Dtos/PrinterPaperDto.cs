namespace MIS_Backend.Dtos
{
    public class PrinterPaperDto
    {
        public int Id { get; set; }

        public int PrinterId { get; set; }

        public int PaperId { get; set; }

        public virtual PaperDto Paper { get; set; } = null!;

        public virtual PrinterDto Printer { get; set; } = null!;
    }
}
