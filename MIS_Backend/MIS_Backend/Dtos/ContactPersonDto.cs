namespace MIS_Backend.Dtos
{
    public class ContactPersonDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string MailAddress { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public string? Note { get; set; }

        public int CustomerId { get; set; }

        public virtual CustomerDto Customer { get; set; } = null!;
    }
}
