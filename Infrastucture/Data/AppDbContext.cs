using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore; // IMPORTANTE
using Microsoft.EntityFrameworkCore;
using Turismo.Api.Models;

namespace Turismo.Api.Infrastructure.Data
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Tour> Tours { get; set; }
    }
}
