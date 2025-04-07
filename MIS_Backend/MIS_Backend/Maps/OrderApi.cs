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
                orderDto.CustomerId = x.Customer.Id;
                orderDto.PrinterId = x.Printer.Id;
                orderDto.UserId = x.User.Id;
                orderDto.PostProcessingId = x.PostProcessing == null ? 0 : x.PostProcessing.Id;
                orderDtos.Add(orderDto);
            });
            return orderDtos;
        });

        group.MapGet("{id}", (OrderService service, int id) =>
        {
            var order = service.GetOrderById(id);
            var orderDto = new OrderDto().CopyFrom(order);
            orderDto.CustomerId = order.Customer.Id;
            orderDto.PrinterId = order.Printer.Id;
            orderDto.UserId = order.User.Id;
            orderDto.PostProcessingId = order.PostProcessing == null ? 0 : order.PostProcessing.Id;
            ;
            return orderDto;
        });

        group.MapPost("", (UserService userService, ProductService productService, OrderService orderService, OrderDto orderDto) => orderService.AddOrder(new Order
        {
            OrderDate = orderDto.OrderDate,
            Quantity = orderDto.Quantity,
            TotalPrice = orderDto.TotalPrice,
            Status = orderDto.Status,
            Notes = orderDto.Notes,
            Customer = userService.GetCustomerById(orderDto.CustomerId),
            Printer = productService.GetPrinterById(orderDto.PrinterId),
            User = userService.GetUserById(orderDto.UserId),
            PostProcessing = orderDto.PostProcessingId == 0 ? null : productService.GetPostProcessingById(orderDto.PostProcessingId)
        }));

        group.MapPut("{id}", (UserService userService, ProductService productService, OrderService orderService, int id, OrderDto orderDto) => orderService.UpdateOrder(id, new Order
        {
            OrderDate = orderDto.OrderDate,
            Quantity = orderDto.Quantity,
            TotalPrice = orderDto.TotalPrice,
            Status = orderDto.Status,
            Notes = orderDto.Notes,
            Customer = userService.GetCustomerById(orderDto.CustomerId),
            Printer = productService.GetPrinterById(orderDto.PrinterId),
            User = userService.GetUserById(orderDto.UserId),
            PostProcessing = orderDto.PostProcessingId == 0 ? null : productService.GetPostProcessingById(orderDto.PostProcessingId)
        }));
        group.MapDelete("{id}", (OrderService service, int id) => service.DeleteOrder(id));
        return routes;
    }
}