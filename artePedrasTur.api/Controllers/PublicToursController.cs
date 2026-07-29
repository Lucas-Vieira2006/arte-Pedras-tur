using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Turismo.Api.Infrastructure.Data;

namespace Turismo.Api.Controllers
{
    [ApiController]
    [Route("api/public/tours")]
    [AllowAnonymous]
    public class PublicToursController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PublicToursController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/public/tours
        [HttpGet]
        public IActionResult GetAll()
        {
            var tours = _context.Tours
                .Select(t => new
                {
                    t.Id,
                    t.Nome,
                    t.Descricao,
                    t.PrecoBase,
                    t.DuracaoHoras,
                    t.ImagemUrl,
                    t.ValorTransfer,
                    t.Ativo,
                    t.Categoria,   
                    t.Localizacao 
                })
                .ToList();

            return Ok(tours);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var tour = _context.Tours
                .Where(t => t.Ativo && t.Id == id)
                .Select(t => new
                {
                    t.Id,
                    t.Nome,
                    t.Descricao,
                    t.PrecoBase,
                    t.DuracaoHoras,
                    t.ImagemUrl,
                    t.ValorTransfer,
                    t.Categoria,
                    t.Ativo,
                    t.Localizacao
                })
                .FirstOrDefault();

            if (tour == null)
                return NotFound();

            return Ok(tour);
        }
    }
}