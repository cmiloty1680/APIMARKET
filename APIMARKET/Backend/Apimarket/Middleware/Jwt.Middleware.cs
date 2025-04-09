using Apimarket.Functions;
using Apimarket.model;
using Apimarket.Models;
using Apimarket.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Apimarket.Middleware
{
    public class JwtMiddleware
    {

        private readonly RequestDelegate _next;
        public JWTModel jwt = new JWTModel();
        private readonly GeneralFunctions _functionsGeneral;
        private readonly List<string> _publicRoutes;



        public JwtMiddleware(RequestDelegate next, IConfiguration _Configuration)
        {
            _next = next;
            jwt = _Configuration.GetSection("Jwt").Get<JWTModel>();
            _functionsGeneral = new GeneralFunctions(_Configuration);
            _publicRoutes = _Configuration.GetSection("RoutePublic")
                                            .Get<List<RouteConfig>>()
                                            .Select(route => route.Route)
                                            .ToList();
        }

        public async Task Invoke(HttpContext context, ResponsibleService responsibleService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var path = context.Request.Path;
            //    switch (path)
            //{
            //    case "/Api/Responsible/Login" or "/Api/Responsible/ResetPassUser":
            //        await _next(context);
            //        return;
            //    default:
            if (_publicRoutes.Contains(path))
            {
                await _next(context);
                return;
            }

            if (token != null)
            {
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync("{\"error\": \"Token no proporcionado.\"}");
                return;

                //}

                if (!AttachUserToContext(context, responsibleService, token))
                {
                    context.Response.StatusCode = 403;
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync("{\"error\": \"Token no proporcionado.\"}");
                    return;
                }
                await _next(context);
                return;

                //break;
            }
        }
        private bool AttachUserToContext(HttpContext context, ResponsibleService responsibleService, string token)
        {
            try
            {
                var key = Encoding.UTF8.GetBytes(jwt.KeySecret);
                var tokenHandler = new JwtSecurityTokenHandler();
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                var userEmail = jwtToken.Claims.First(x => x.Type == "Responsable").Value;

                context.Items["responsible"] = responsibleService.GetByEmail(userEmail);
                return true;
            }
            catch (Exception ex)
            {

                _functionsGeneral.Addlog(ex.ToString());
                return false;

            }
        }
    }
}