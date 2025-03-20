using CustomersDb;
using DB_Libary;
using Microsoft.EntityFrameworkCore;
namespace MIS_Backend.Services
{
    public class OrderService(DatabaseContext db)
    {
        public List<Order> GetAllOrders()
        {
            try
            {
                return db.Orders
                .Include(o => o.Customer)
                .Include(o => o.User)
                .Include(o => o.Printer)
                .Include(o => o.PostProcessing)
                .ToList();
            }
            catch (Exception e)
            {
                throw new Exception($"Failed to get all orders.\nError: [{e}]");
            }
        }

        public Order GetOrderById(int id)
        {
            try
            {
                return db.Orders
                .Where(o => o.Id == id)
                .Include(o => o.Customer)
                .Include(o => o.User)
                .Include(o => o.Printer)
                .Include(o => o.PostProcessing)
                .First();
            }
            catch (Exception e)
            {
                throw new Exception($"Order with id [{id}] not found.\nError: [{e}]");
            }
        }

        public Order AddOrder(Order order)
        {
            try
            {
                db.Orders.Add(order);
                db.SaveChanges();
                return order;
            }
            catch (Exception e)
            {
                throw new Exception($"Failed to add order.\nError: [{e}]");
            }
        }

        public Order UpdateOrder(int id, Order order)
        {
            try
            {
                var oldOrder = db.Orders.Where(o => o.Id == id).First();

                oldOrder.User = order.User;
                oldOrder.Customer = order.Customer;
                oldOrder.Printer = order.Printer;
                oldOrder.OrderDate = order.OrderDate;
                oldOrder.Quantity = order.Quantity;
                oldOrder.TotalPrice = order.TotalPrice;
                oldOrder.Status = order.Status;
                oldOrder.Notes = order.Notes;

                db.SaveChanges();
                return order;
            }
            catch (Exception e)
            {
                throw new Exception($"Failed to update order.\nError: [{e}]");
            }
        }

        public void DeleteOrder(int id)
        {
            try
            {
                db.Orders.Remove(GetOrderById(id));
                db.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception($"Failed to delete order.\nError: [{e}]");
            }
        }
    }
}
