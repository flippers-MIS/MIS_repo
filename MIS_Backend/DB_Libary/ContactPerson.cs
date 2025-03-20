namespace DB_Libary;

public class ContactPerson
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string MailAddress { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? Note { get; set; }
    public int CustomerId { get; set; }
    public Customer Customers { get; set; } = null!;

}
