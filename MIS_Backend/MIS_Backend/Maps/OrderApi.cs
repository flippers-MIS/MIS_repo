using DB_Libary;
using MIS_Backend.Dtos;
using MIS_Backend.Services;

namespace MIS_Backend.Maps;

public static class OrderApi
{
    public static IEndpointRouteBuilder MapOrder(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/orders");
        group.MapGet("", (OrderService service) =>
        {
            var orders = service.GetAllOrders();
            List<OrderDto> orderDtos = [];
            orders.ForEach(x =>
            {
                var orderDto = new OrderDto().CopyFrom(x);
                orderDtos.Add(orderDto);
            });
            return orderDtos;
        });

        group.MapGet("{id}", (OrderService service, int id) =>
        {
            var order = service.GetOrderById(id);
            var orderDto = new OrderDto().CopyFrom(order);
        });

        group.MapPost("", (OrderService service, OrderDto orderDto) => service.AddOrder(orderDto));

        group.MapPut("{id}", (OrderService service, int id, OrderDto orderDto) => service.UpdateOrder(id, orderDto));
        group.MapDelete("{id}", (OrderService service, int id) => service.DeleteOrder(id));
        return routes;
    }
}