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
                orderDto.Customer = new CustomerDto().CopyFrom(x.Customer, ["Id"]);
                orderDto.Printer = new PrinterDto().CopyFrom(x.Printer);
                orderDto.User = new UserDto().CopyFrom(x.User);
                orderDto.PostProcessing = new PostProcessingDto().CopyFrom(x.PostProcessing);
                orderDtos.Add(orderDto);
            });
            return orderDtos;
        });

        group.MapGet("{id}", (OrderService service, int id) =>
        {
            var order = service.GetOrderById(id);
            var orderDto = new OrderDto().CopyFrom(order);
            orderDto.Customer = new CustomerDto().CopyFrom(order.Customer);
            orderDto.Printer = new PrinterDto().CopyFrom(order.Printer);
            orderDto.User = new UserDto().CopyFrom(order.User);
            orderDto.PostProcessing = new PostProcessingDto().CopyFrom(order.PostProcessing);
        });

        group.MapPost("", (OrderService service, OrderDto orderDto) => service.AddOrder(new Order
        {
            OrderDate = orderDto.OrderDate,
            Quantity = orderDto.Quantity,
            TotalPrice = orderDto.TotalPrice,
            Status = orderDto.Status,
            Notes = orderDto.Notes,
            Customer = new Customer().CopyFrom(orderDto.Customer, ["Id"]),
            Printer = new Printer().CopyFrom(orderDto.Printer, ["Id"]),
            User = new User().CopyFrom(orderDto.User, ["Id"]),
            PostProcessing = new PostProcessing().CopyFrom(orderDto.PostProcessing, ["Id"])
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
            PostProcessing = new PostProcessing().CopyFrom(orderDto.PostProcessing, ["Id"])
        }));
        group.MapDelete("{id}", (OrderService service, int id) => service.DeleteOrder(id));
        return routes;
    }
}