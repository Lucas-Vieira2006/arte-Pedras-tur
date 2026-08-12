using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Turismo.Api.Services
{
    public interface IJwtTokenService
    {
        string GenerateToken(string email, IEnumerable<string> roles, TimeSpan? expiry = null);
    }

    public class JwtTokenService : IJwtTokenService
    {
        private readonly string _signingKey;

        public JwtTokenService(string signingKey)
        {
            _signingKey = signingKey;
        }

        public string GenerateToken(string email, IEnumerable<string> roles, TimeSpan? expiry = null)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, email)
            };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_signingKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(expiry ?? TimeSpan.FromHours(8)),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
