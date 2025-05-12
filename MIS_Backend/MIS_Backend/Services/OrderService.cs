using DB_Libary;
using Microsoft.EntityFrameworkCore;
using MIS_Backend.Dtos;
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
                .Include(o => o.Paper)
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
                .Include(o => o.Paper)
                .Include(o => o.Printer)
                .Include(o => o.PostProcessing)
                .First();
            }
            catch (Exception e)
            {
                throw new Exception($"Order with id [{id}] not found.\nError: [{e}]");
            }
        }

        public Order AddOrder(OrderDto order)
        {
            try
            {
                var newOrder = new Order().CopyFrom(order, ["Id"]);
                newOrder.Customer = db.Customers.Where(c => c.Id == order.CustomerId).First();
                newOrder.Paper = db.Papers.Where(p => p.Id == order.PaperId).First();
                newOrder.Printer = db.Printers.Where(p => p.Id == order.PrinterId).First();
                db.Orders.Add(newOrder);
                db.SaveChanges();
                return newOrder;
            }
            catch (Exception e)
            {
                throw new Exception($"Failed to add order.\nError: [{e}]");
            }
        }

        public Order UpdateOrder(int id, OrderDto order)
        {
            try
            {
                var oldOrder = db.Orders.Where(o => o.Id == id).First();

                oldOrder.CopyFrom(order, ["Id"]);

                oldOrder.Customer = db.Customers.Where(c => c.Id == order.CustomerId).First();
                oldOrder.Paper = db.Papers.Where(p => p.Id == order.PaperId).First();
                oldOrder.Printer = db.Printers.Where(p => p.Id == order.PrinterId).First();

                db.SaveChanges();
                return oldOrder;
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
