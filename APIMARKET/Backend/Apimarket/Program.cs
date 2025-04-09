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
builder.Services.AddScoped<ProductionService>();
builder.Services.AddScoped<HiveService>();
builder.Services.AddScoped<ReviewService>();
builder.Services.AddScoped<RaceServices>();
builder.Services.AddScoped<CollecDroneServices>();
builder.Services.AddScoped<ExtractionServices>();
builder.Services.AddScoped<FertilizationServices>();








//builder.Services.AddAuthentication(option =>
//{
//    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//});


//var jwtKey = builder.Configuration.GetSection("JWT:KeySecret").Value;
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuerSigningKey = true,
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
//            ValidateIssuer = false,
//            ValidateAudience = false,
//            ClockSkew = TimeSpan.Zero
//        };

//        options.Events = new JwtBearerEvents
//        {
//            OnChallenge = context =>
//            {
//                // Evitar el manejo por defecto
//                context.HandleResponse();
//                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
//                context.Response.ContentType = "application/json";

//                if (string.IsNullOrEmpty(context.Error))
//                {
//                    context.Error = "Token invalido o no autorizado.";

//                }
//                if (string.IsNullOrEmpty(context.ErrorDescription))
//                    context.ErrorDescription = "Esta solicitud requiere que se proporcione un token de acceso JWT válido";

//                if(context.AuthenticateFailure != null && context.AuthenticateFailure.GetType() == typeof(SecurityTokenExpiredException))
//                {
//                    var authenticationExcepcion = context.AuthenticateFailure as SecurityTokenExpiredException;
//                    context.Response.Headers.Add("x-token-expired", authenticationExcepcion.Expires.ToString("o"));
//                    context.ErrorDescription = $"El token expiro {authenticationExcepcion.Expires.ToString("o")}";

//                }

//                return context.Response.WriteAsync(JsonSerializer.Serialize(new
//                {
//                    error = context.Error,
//                    error_description = context.ErrorDescription,
//                }));
//            }
//        };
//    });




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
//app.UseMiddleware<JwtMiddleware>();
app.UseAuthentication();

app.MapControllers();

app.Run();