using Microsoft.AspNetCore.Identity;

namespace Turismo.Api.Infrastructure.Seed
{
    public static class IdentitySeed
    {
        public static async Task SeedAsync(IServiceProvider services, IConfiguration configuration)
        {
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = services.GetRequiredService<UserManager<IdentityUser>>();

            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }

            var email = "admin@artepedrastur.com";
            // Senha do admin seedado em Development. Configurável via Seed:AdminPassword
            // (variável de ambiente Seed__AdminPassword) para quem quiser trocar localmente.
            // Este seed nunca roda em Production (ver Program.cs) — a senha real de produção
            // vem de banco/init.sql e é trocada manualmente, não por aqui.
            var password = configuration["Seed:AdminPassword"] ?? "Dev@Local123!";

            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                user = new IdentityUser { UserName = email, Email = email };
                await userManager.CreateAsync(user, password);
            }

            if (!await userManager.IsInRoleAsync(user, "Admin"))
            {
                await userManager.AddToRoleAsync(user, "Admin");
            }
        }
    }
}
