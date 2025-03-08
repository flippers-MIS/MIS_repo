using CustomersDb;
using GrueneisR.RestClientGenerator;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MIS_Backend;
using MIS_Backend.Dtos;
using MIS_Backend.Maps;
using MIS_Backend.Services;


string corsKey = "_myCorsKey";
string swaggerVersion = "v1";
string swaggerTitle = "SwaggerBackend";
string restClientFolder = Environment.CurrentDirectory;
string restClientFilename = "_requests.http";

var builder = WebApplication.CreateBuilder(args);

#region -------------------------------------------- ConfigureServices
builder.Services.AddControllers();
builder.Services
  .AddEndpointsApiExplorer()
  .AddAuthorization()
  .AddSwaggerGen(x => x.SwaggerDoc(
    swaggerVersion,
    new OpenApiInfo { Title = swaggerTitle, Version = swaggerVersion }
  ))
  .AddCors(options => options.AddPolicy(
    corsKey,
    x => x.SetIsOriginAllowed(_ => true).AllowAnyMethod().AllowAnyHeader().AllowCredentials()
  ))
  .AddRestClientGenerator(options => options
    .SetFolder(restClientFolder)
    .SetFilename(restClientFilename)
    .SetAction($"swagger/{swaggerVersion}/swagger.json")
  //.EnableLogging()
  );

//string? connectionString = builder.Configuration.GetConnectionString("MIS_Database");
//string location = System.Reflection.Assembly.GetEntryAssembly()!.Location;
//string dataDirectory = Path.GetDirectoryName(location)!;
var config = new ConfigurationBuilder()
  .SetBasePath(AppContext.BaseDirectory)
  .AddJsonFile("appsettings.json")
  .Build();
string connectionString = config.GetConnectionString("MisDatabase")!;
//connectionString = connectionString?.Replace("|DataDirectory|", dataDirectory + Path.DirectorySeparatorChar);
Console.ForegroundColor = ConsoleColor.Cyan;
Console.WriteLine($"++++ ConnectionString: {connectionString}");
Console.ResetColor();
builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(connectionString));
#endregion


builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<PaymentService>();
builder.Services.AddScoped<ProductService>();

var app = builder.Build();

#region -------------------------------------------- Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    Console.ForegroundColor = ConsoleColor.Green;
    Console.WriteLine("++++ Swagger enabled: http://localhost:5000");
    app.UseSwagger();
    Console.WriteLine($@"++++ RestClient generating (after first request) to {restClientFolder}\{restClientFilename}");
    app.UseRestClientGenerator();
    app.UseSwaggerUI(x => x.SwaggerEndpoint($"/swagger/{swaggerVersion}/swagger.json", swaggerTitle));
    Console.ResetColor();
}

app.UseCors(corsKey);
//app.UseHttpsRedirection();
app.UseAuthorization();
#endregion

app.MapProduct();
app.MapOrder();
app.MapUser();

//DummyValues
app.MapPost("/TESTuserDto", (UserService service, UserDto userDto) => service.AddUser(new User().CopyFrom(userDto)));
app.MapPost("/TESTprinter", (ProductService service, PrinterDto printerDto) => service.AddPrinter(new Printer().CopyFrom(printerDto, ["Id"])));
app.MapPost("/TESTpaper", (ProductService service, PaperDto paperDto) => service.AddPaper(new Paper().CopyFrom(paperDto)));
app.MapPost("/TESTorder", (OrderService service, OrderDto orderDto) => service.AddOrder(new Order
{
    OrderDate = orderDto.OrderDate,
    Quantity = orderDto.Quantity,
    TotalPrice = orderDto.TotalPrice,
    Status = orderDto.Status,
    Notes = orderDto.Notes,
    Customer = new Customer().CopyFrom(orderDto.Customer),
    Printer = new Printer().CopyFrom(orderDto.Printer),
    User = new User().CopyFrom(orderDto.User),
    PostProcessing = orderDto.PostProcessing?.TransformTo<PostProcessing>()
}));



Console.WriteLine($"Ready for clients at {DateTime.Now:HH:mm:ss} ...");
app.Run();