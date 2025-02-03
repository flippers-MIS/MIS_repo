using MIS_Database;
namespace MIS_Backend.Services
{
    public class OrderService(DatabaseContext db)
    {
        public List<Order> GetAllOrders() 
            => db.Orders.ToList();

        public Order GetOrderById(int id)
            => db.Orders.Where(o => o.Id == id).First();

        public Order AddeOrder(Order order)
        {
            db.Orders.Add(order);
            db.SaveChanges();
            return order;
        }

        public Order UpdateOrder(int id, Order order)
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

        public void DeleteOrder(int id)
        {           
            db.Orders.Remove(GetOrderById(id));
            db.SaveChanges();
        }

    }
}
