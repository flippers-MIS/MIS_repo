namespace MIS_Backend.Maps
{
    public static class UserApi
    {
        public static IEndpointRouteBuilder MapUser(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/users");
            return routes;
        }
    }
}