namespace CustomersDb;

public class Order
{
    public int Id { get; set; } 
    public int CustomerId { get; set; } 
    public int PrinterId { get; set; } 
    public int UserId { get; set; } 

    public DateOnly OrderDate { get; set; }
    public int Quantity { get; set; } 
    public double TotalPrice { get; set; } 
    public string Status { get; set; } = string.Empty; 
    public string? Notes { get; set; } 

    // Navigation Properties
    public Customer Customer { get; set; } = null!; 
    public Printer Printer { get; set; } = null!; 
    public User User { get; set; } = null!;
    public PostProcessing? PostProcessing { get; set; }
}
