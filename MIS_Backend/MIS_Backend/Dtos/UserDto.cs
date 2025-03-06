namespace MIS_Backend.Dtos
{
    public class UserDto
    {
        //public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Role { get; set; } = null!;

        //public List<OrderDto> Orders { get; set; } = [];
    }
}
