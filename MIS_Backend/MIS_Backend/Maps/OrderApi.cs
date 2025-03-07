using CustomersDb;
using MIS_Backend.Dtos;
using MIS_Backend.Services;

namespace MIS_Backend.Maps;

public static class OrderApi
{
    public static IEndpointRouteBuilder MapOrder(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/orders");
        group.MapGet("", (OrderService service) => service.GetAllOrders().Select(x => new OrderDto().CopyFrom(x)).ToList());
        group.MapGet("{id}", (OrderService service, int id) => new OrderDto().CopyFrom(service.GetOrderById(id)));
        group.MapPost("", (OrderService service, OrderDto orderDto) => service.AddOrder(new Order
        {
            OrderDate = orderDto.OrderDate,
            Quantity = orderDto.Quantity,
            TotalPrice = orderDto.TotalPrice,
            Status = orderDto.Status,
            Notes = orderDto.Notes,
            Customer = new Customer().CopyFrom(orderDto.Customer),
            Printer = new Printer().CopyFrom(orderDto.Printer),
            User = new User().CopyFrom(orderDto.User),
            PostProcessing = orderDto.PostProcessing?.TransformTo<PostProcessing>()
        }));

        group.MapPut("{id}", (OrderService service, int id, OrderDto orderDto) => service.UpdateOrder(id, new Order
        {
            OrderDate = orderDto.OrderDate,
            Quantity = orderDto.Quantity,
            TotalPrice = orderDto.TotalPrice,
            Status = orderDto.Status,
            Notes = orderDto.Notes,
            Customer = new Customer().CopyFrom(orderDto.Customer),
            Printer = new Printer().CopyFrom(orderDto.Printer),
            User = new User().CopyFrom(orderDto.User),
            PostProcessing = orderDto.PostProcessing?.TransformTo<PostProcessing>()
        }));
        group.MapDelete("{id}", (OrderService service, int id) => service.DeleteOrder(id));
        return routes;
    }
}