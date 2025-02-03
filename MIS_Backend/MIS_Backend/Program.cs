using GrueneisR.RestClientGenerator;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MIS_Backend.Maps;
using MIS_Backend.Services;
using MIS_Database;

var builder = WebApplication.CreateBuilder(args);

string corsKey = "_myCorsKey";
string swaggerVersion = "v1";
string swaggerTitle = "SwaggerBackend";
string restClientFolder = Environment.CurrentDirectory;
string restClientFilename = "_requests.http";

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

string? connectionString = builder.Configuration.GetConnectionString("MIS_Database");

builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<PaymentService>();
builder.Services.AddScoped<ProductService>();

var app = builder.Build();

app.MapProduct();
app.MapOrder();
app.MapUser();

app.Run();