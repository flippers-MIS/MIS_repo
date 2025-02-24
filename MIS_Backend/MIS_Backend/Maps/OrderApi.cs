using MIS_Backend.Dtos;
using MIS_Backend.Services;
using MIS_Database;

namespace MIS_Backend.Maps;

public static class OrderApi
{
     public static IEndpointRouteBuilder MapOrder(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/orders");
        group.MapGet("", (OrderService service) => service.GetAllOrders().Select(x => new OrderDto().CopyFrom(x)).ToList());
        group.MapGet("{id}", (OrderService service, int id) => new OrderDto().CopyFrom(service.GetOrderById(id)));
        group.MapPost("", (OrderService service, OrderDto order) =>
{
            var newOrder = new Order();
            newOrder.CopyFrom(order);
            return service.AddOrder(newOrder);
        });
        group.MapPut("{id}", (OrderService service, int id, OrderDto order) => service.UpdateOrder(id, new Order().CopyFrom(order)));
        group.MapDelete("{id}", (OrderService service, int id) => service.DeleteOrder(id));
        return routes;
    }
}