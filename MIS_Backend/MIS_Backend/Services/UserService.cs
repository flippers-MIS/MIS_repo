using CustomersDb;

namespace MIS_Backend.Services;

public class UserService(DatabaseContext db)
{
    //User
    public List<User> GetAllUsers()
    {
        try
        {
            return [.. db.Users.OrderBy(u => u.Name)];
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to get all users.\nError: [{e}]");
        }
    }

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
            db.SaveChanges();

        }
        catch (Exception e)
        {
            throw new Exception($"Failed to update user with id [{id}].\nError: [{e}]");
        }
    }

    public void DeleteUser(int id)
    {
        try
        {
            db.Users.Remove(GetUserById(id));
            db.SaveChanges();
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to delete user with id [{id}].\nError: [{e}]");
        }
    }

    //Customer

    public List<Customer> GetAllCustomers()
    {
        try
        {
            return [.. db.Customers];
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to get all customers.\nError: [{e}]");
        }
    }

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

            customer.PersonName = updatedCustomer.PersonName;
            customer.CompanyName = updatedCustomer.CompanyName;
            customer.MailAdress = updatedCustomer.MailAdress;
            customer.PhoneNumber = updatedCustomer.PhoneNumber;
            customer.City = updatedCustomer.City;
            customer.Street = updatedCustomer.Street;
            customer.ZipCode = updatedCustomer.ZipCode;
            customer.Country = updatedCustomer.Country;
            customer.Discount = updatedCustomer.Discount;
            customer.PaymentTerms = updatedCustomer.PaymentTerms;

            db.SaveChanges();
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to update customer with id [{id}].\nError: [{e}]");
        }
    }

    public void DeleteCustomer(int id)
    {
        try
        {
            db.Customers.Remove(GetCustomerById(id));
            db.SaveChanges();
        }
        catch (Exception e)
        {
            throw new Exception($"Failed to delete customer with id [{id}].\nError: [{e}]");
        }
    }
}
