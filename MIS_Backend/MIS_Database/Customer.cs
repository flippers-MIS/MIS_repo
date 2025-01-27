using System;
using System.Collections.Generic;

namespace MIS_Database;

public partial class Customer
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string MailAdress { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Street { get; set; } = null!;

    public int ZipCode { get; set; }

    public string Country { get; set; } = null!;

    public double Discount { get; set; }

    public DateOnly PaymentTerms { get; set; }

    public virtual ICollection<ContactPerson> ContactPeople { get; set; } = new List<ContactPerson>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
