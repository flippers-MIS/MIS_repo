using DB_Libary;
using MIS_Backend.Dtos;
using MIS_Backend.Services;

namespace MIS_Backend.Maps;

public static class UserApi
{
    public static IEndpointRouteBuilder MapUser(this IEndpointRouteBuilder routes)
    {
        //User
        var userGroup = routes.MapGroup("/users");
        //GET
        userGroup.MapGet("", (UserService service) => service.GetAllUsers().Select(x => new UserDto().CopyFrom(x)).ToList());
        userGroup.MapGet("{id}", (UserService service, int id) => new UserDto().CopyFrom(service.GetUserById(id)));
        //POST
        userGroup.MapPost("", (UserService service, UserDto userDto) => service.AddUser(new User().CopyFrom(userDto, ["Id"])));
        //PUT
        userGroup.MapPut("{id}", (UserService service, int id, UserDto userDto) => service.UpdateUser(id, new User().CopyFrom(userDto)));
        //DELETE
        userGroup.MapDelete("{id}", (UserService service, int id) => service.DeleteUser(id));

        //Customer
        var customerGroup = routes.MapGroup("/customers");
        //GET
        customerGroup.MapGet("", (UserService service) => service.GetAllCustomers().Select(x => new CustomerDto().CopyFrom(x)).ToList());
        customerGroup.MapGet("{id}", (UserService service, int id) => new CustomerDto().CopyFrom(service.GetCustomerById(id)));
        //POST
        customerGroup.MapPost("", (UserService service, CustomerDto customerDto) => service.AddCustomer(new Customer().CopyFrom(customerDto, ["Id"])));
        //PUT
        customerGroup.MapPut("{id}", (UserService service, int id, CustomerDto customerDto) => service.UpdateCustomer(id, new Customer().CopyFrom(customerDto)));
        //DELETE
        customerGroup.MapDelete("{id}", (UserService service, int id) => service.DeleteCustomer(id));

        return routes;
    }
}