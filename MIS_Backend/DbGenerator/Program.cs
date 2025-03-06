using CustomersDb;

using Microsoft.EntityFrameworkCore;

string dbPath = @"C:\Projekt\MIS_repo\MIS_Backend\MIS_Database\MisDatabase.mdf";
string dbName = "MisDatabase";

string connectionString = @$"Server=(LocalDB)\mssqllocaldb;attachdbfilename={dbPath};Database={dbName};integrated security=True;MultipleActiveResultSets=True";
var options = new DbContextOptionsBuilder<DatabaseContext>().UseSqlServer(connectionString);
var db = new DatabaseContext(options.Options);

Console.WriteLine($"Deleting database {dbPath}"); db.Database.EnsureDeleted();
Console.WriteLine($"Creating database {dbPath}"); db.Database.EnsureCreated();
