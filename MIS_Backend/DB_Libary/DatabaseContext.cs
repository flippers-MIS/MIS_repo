using Microsoft.EntityFrameworkCore;

namespace CustomersDb;
public class DatabaseContext : DbContext
{
    public DatabaseContext() { }
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

    public DbSet<ContactPerson> ContactPersons { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Paper> Papers { get; set; }
    public DbSet<PostProcessing> PostProcessings { get; set; }
    public DbSet<Printer> Printers { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (optionsBuilder.IsConfigured) return;
        optionsBuilder.UseSqlServer(@$"Server=(LocalDB)\mssqllocaldb;attachdbfilename=C:\Projekt\MIS_repo\MIS_Backend\DB_Libary\MisDatabase.mdf;Database=MisDatabase;integrated security=True;MultipleActiveResultSets=True");
    }
}
