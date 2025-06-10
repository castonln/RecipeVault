using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "RecipeVault API", Version = "v1" });
}); ;

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("https://recipevault-client.onrender.com") // Removed trailing slash
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

builder.Services.AddMemoryCache();

// Dependency Injection for BaseEntityService
builder.Services.AddScoped<UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapSwagger();

app.UseHttpsRedirection();

// Place CORS before authorization and controllers
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
