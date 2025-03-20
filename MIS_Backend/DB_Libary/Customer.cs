namespace DB_Libary;

public class Customer
{
    public int Id { get; init; }
    public string PersonName { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string MailAdress { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;    
    public string Street { get; set; } = string.Empty;
    public int ZipCode { get; set; }
    public string Country { get; set; } = string.Empty;
    public double Discount { get; set; }
    public string PaymentTerms { get; set; } = string.Empty;


    //public string Name => $"{FirstName} {LastName}";

    //public  List<Order> Orders { get; set; } = [];
}

