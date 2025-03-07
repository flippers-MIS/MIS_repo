using MIS_Backend.Dtos;
using MIS_Backend.Services;

namespace MIS_Backend.Maps
{
    public static class UserApi
    {
        public static IEndpointRouteBuilder MapUser(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/users");
            group.MapGet("", (UserService service) => service.GetAllUsers().Select(x => new UserDto().CopyFrom(x)).ToList());
            return routes;
        }
    }
}