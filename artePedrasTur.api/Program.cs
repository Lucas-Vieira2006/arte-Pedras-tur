using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.RateLimiting;
using Turismo.Api.Infrastructure.Data;
using Turismo.Api.Infrastructure.Seed;
using Turismo.Api.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// Autenticação via JWT emitido pelo próprio backend (ASP.NET Identity)
// Sem fallback hardcoded: falha rápido no boot se Jwt:Key (env var JWT_KEY) não
// estiver configurada, em vez de assinar tokens com uma chave conhecida/previsível.
// Checagem por string.IsNullOrWhiteSpace, não só null: quando JWT_KEY não está
// setada no host, o docker-compose substitui por string vazia (não omite a env
// var), então um "?? throw" sozinho não pega esse caso — confirmado testando
// com requisição HTTP real, onde isso resultava em 500 silencioso no login em
// vez de falhar na subida do container.
var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new InvalidOperationException("Configuração 'Jwt:Key' ausente. Defina a variável de ambiente JWT_KEY.");
}
builder.Services.AddSingleton<IJwtTokenService>(new JwtTokenService(jwtKey));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey)),
        ClockSkew = TimeSpan.FromMinutes(5),
    };
});

builder.Services.AddLogging(logging => logging.AddConsole());

var corsOrigins = (builder.Configuration["Cors:Origins"] ?? "http://localhost:5173")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AppPolicy", policy =>
    {
        policy.WithOrigins(corsOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Rate limiting no login: mitiga força bruta de credenciais. 5 tentativas por IP
// por minuto, sem fila (excesso é rejeitado na hora com 429, não empilhado).
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy("login", httpContext => RateLimitPartition.GetFixedWindowLimiter(
        partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        factory: _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 5,
            Window = TimeSpan.FromMinutes(1),
            QueueLimit = 0
        }));
});

var app = builder.Build();

// Tratamento de exceção explícito nos dois ambientes: em Development mostra a
// página de erro detalhada; em produção nunca vaza stack trace, só uma resposta
// JSON genérica.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler(errorApp =>
    {
        errorApp.Run(async context =>
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync("{\"error\":\"Ocorreu um erro interno.\"}");
        });
    });
}

app.Use(async (context, next) =>
{
    context.Response.Headers.XContentTypeOptions = "nosniff";
    context.Response.Headers.XFrameOptions = "DENY";
    if (!app.Environment.IsDevelopment())
    {
        context.Response.Headers.ContentSecurityPolicy = "default-src 'none'";
    }
    await next();
});

app.UseCors("AppPolicy");

app.UseRateLimiter();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    await IdentitySeed.SeedAsync(scope.ServiceProvider, app.Configuration);
}

app.Run();