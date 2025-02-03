using MIS_Database;
namespace MIS_Backend.Services;

public class UserService(DatabaseContext db)
{
    //User
    public List<User> GetAllUsers()
        => db.Users.OrderBy(u => u.Name).ToList();

    public User GetUserById(int id)
    {
        try
        {
            return db.Users.Where(u => u.Id == id).First();
        }
        catch (Exception e)
        {
            throw new Exception($"User with id [{id}] not found.\nError: [{e}]");
        }
    }

    public User GetUserByName(string name)
    {
        try
        {
            return db.Users.Where(u => u.Name == name).First();
        }
        catch (Exception e)
        {
            throw new Exception($"User with name [{name}] not found.\nError: [{e}]");
        }
    }

    public User AddUser(User user)
    {
        try
        {
            db.Users.Add(user);
            db.SaveChanges();
            return user;
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to add user.\nError: [{e}]");
        }
    }

    public void UpdateUser(int id, User updatedUser)
    {
        try
        {
            var user = db.Users.Where(u => u.Id == id).First();
            user.Name = updatedUser.Name;
            user.Password = updatedUser.Password;
            user.Role = updatedUser.Role;
            user.Orders = updatedUser.Orders;
            db.SaveChanges();

        }
        catch (Exception e)
        {
            throw new Exception($"Failed to update user with id [{id}].\nError: [{e}]");
        }
    }

    public void DeleteUser(int id)
    {
        db.Users.Remove(GetUserById(id));
        db.SaveChanges();
    }

    //Customer

    public List<Customer> GetAllCustomers()
        => db.Customers.OrderBy(c => c.FirstName).ToList();

    public Customer GetCustomerById(int id)
    {
        try
        {
            return db.Customers.Where(c => c.Id == id).First();
        }
        catch (Exception e)
        {
            throw new Exception($"Customer with id [{id}] not found.\nError: [{e}]");
        }
    }

    public Customer AddCustomer(Customer customer)
    {
        try
        {
            db.Customers.Add(customer);
            db.SaveChanges();
            return customer;
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to add customer.\nError: [{e}]");
        }
    }

    public void UpdateCustomer(int id, Customer updatedCustomer)
    {
        try
        {
            var customer = db.Customers.Where(c => c.Id == id).First();
            customer.FirstName = updatedCustomer.FirstName;
            customer.LastName = updatedCustomer.LastName;
            customer.MailAdress = updatedCustomer.MailAdress;
            customer.PhoneNumber = updatedCustomer.PhoneNumber;
            customer.Orders = updatedCustomer.Orders;
            db.SaveChanges();
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to update customer with id [{id}].\nError: [{e}]");
        }
    }

    public void DeleteCustomer(int id)
    {
        db.Customers.Remove(GetCustomerById(id));
        db.SaveChanges();
    }
}
