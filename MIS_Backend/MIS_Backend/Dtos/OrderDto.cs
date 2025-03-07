namespace MIS_Backend.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }

        //public int CustomerId { get; set; }

        //public int PrinterId { get; set; }

        //public int UserId { get; set; }

        public string OrderDate { get; set; } = null!;

        public int Quantity { get; set; }

        public double TotalPrice { get; set; }

        public string Status { get; set; } = null!;

        public string? Notes { get; set; }

        public virtual CustomerDto Customer { get; set; } = null!;

        public virtual PrinterDto Printer { get; set; } = null!;

        public virtual UserDto User { get; set; } = null!;
        public PostProcessingDto? PostProcessing { get; set; }

    }
}
