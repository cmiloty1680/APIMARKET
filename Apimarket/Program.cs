using Apimarket.Middleware;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
    builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseMySql(builder.Configuration.GetConnectionString("DefaultConection"),
new MySqlServerVersion(new Version(8, 0, 23)))
);
builder.Services.AddScoped<ProtocolServices>();
builder.Services.AddScoped<FeedingServices>();
builder.Services.AddScoped<ImplementService>();
builder.Services.AddScoped<ResponsibleService>();




//builder.Services.AddAuthentication(option =>
//{
//    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//});


var jwtKey = builder.Configuration.GetSection("JWT:KeySecret").Value;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateIssuer = false,
            ValidateAudience = false
        };

        options.Events = new JwtBearerEvents
        {
            OnChallenge = context =>
            {
                // Evitar el manejo por defecto
                context.HandleResponse();

                // Retornar el mensaje personalizado
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                var result = JsonSerializer.Serialize(new { message = "El token es requerido para acceder a este recurso." });
                return context.Response.WriteAsync(result);
            }
        };
    });




var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}
var keySecret = builder.Configuration["JWT:KeySecret"];

app.UseCors("AllowSpecificOrigin");

app.UseRouting();
app.UseAuthorization();
app.UseAuthorization();
app.UseMiddleware<Jwt>();
app.UseAuthentication();

app.MapControllers();

app.Run();