using Apimarket.Functions;

using Apimarket.models;
using Apimarket.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Apimarket.Middleware
{
    public class Jwt
    {

        private readonly RequestDelegate _next;
        public JWTModel jwt = new JWTModel();
        private readonly GeneralFunctions _functionsGeneral;



        public Jwt(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            jwt = configuration.GetSection("Jwt").Get<JWTModel>();
            _functionsGeneral = new GeneralFunctions(configuration);

        }

        public async Task Invoke(HttpContext context, ResponsibleService responsibleService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (token != null)
                AttachUserToContext(context, responsibleService, token);
            await _next(context);
        }
        private void AttachUserToContext(HttpContext context, ResponsibleService responsibleService, string token)
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
            }
            catch (Exception ex)
            {

                _functionsGeneral.Addlog(ex.ToString());

            }
        }
    }
}