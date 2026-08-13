using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Turismo.Api.Services;

namespace Turismo.Api.Tests;

public class JwtTokenServiceTests
{
    private const string SigningKey = "chave-de-teste-com-tamanho-suficiente-1234567890";

    [Fact]
    public void GenerateToken_IncludesEmailAndRoleClaims()
    {
        var service = new JwtTokenService(SigningKey);

        var token = service.GenerateToken("admin@artepedrastur.com", new[] { "Admin" });

        var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);

        // JwtSecurityTokenHandler remapeia ClaimTypes.Name/Role para os nomes curtos
        // "unique_name"/"role" ao escrever o token (é por isso que o frontend lê
        // decoded.role em vez de decoded[ClaimTypes.Role]).
        var nameClaimType = JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap[ClaimTypes.Name];
        var roleClaimType = JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap[ClaimTypes.Role];

        Assert.Contains(jwt.Claims, c => c.Type == nameClaimType && c.Value == "admin@artepedrastur.com");
        Assert.Contains(jwt.Claims, c => c.Type == roleClaimType && c.Value == "Admin");
    }

    [Fact]
    public void GenerateToken_ValidatesSuccessfullyWithSameKey()
    {
        var service = new JwtTokenService(SigningKey);
        var token = service.GenerateToken("admin@artepedrastur.com", new[] { "Admin" });

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SigningKey)),
        };

        var principal = new JwtSecurityTokenHandler().ValidateToken(token, validationParameters, out _);

        Assert.Equal("admin@artepedrastur.com", principal.Identity!.Name);
    }

    [Fact]
    public void GenerateToken_FailsValidationWithDifferentKey()
    {
        var service = new JwtTokenService(SigningKey);
        var token = service.GenerateToken("admin@artepedrastur.com", new[] { "Admin" });

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("outra-chave-completamente-diferente-0987654321")),
        };

        Assert.Throws<SecurityTokenSignatureKeyNotFoundException>(() =>
            new JwtSecurityTokenHandler().ValidateToken(token, validationParameters, out _));
    }
}
