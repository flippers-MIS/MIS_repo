using MIS_Backend.Services;

namespace MIS_Backend.Maps;

public static class OrderApi
{
     public static IEndpointRouteBuilder MapOrder(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/orders");
        group.MapGet("", (OrderService service) => service.GetAllOrders());
        return routes;
    }
}