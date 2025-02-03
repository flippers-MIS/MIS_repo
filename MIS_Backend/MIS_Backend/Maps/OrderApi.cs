namespace MIS_Backend.Maps
{
    public static class OrderApi
    {
         public static IEndpointRouteBuilder MapOrder(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/orders");
            group.MapGet("", (OrderService service) => service.GetOrders());
            return routes;
        }
}
