using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Turismo.Api.DTOs;
using Turismo.Api.Infrastructure.Data;
using Turismo.Api.Models;

namespace Turismo.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/admin/tours")]
    public class ToursController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ToursController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TourResponseDto>>> GetAll()
        {
            // REMOVIDO: O filtro de .Where(t => t.Ativo)
            var tours = await _context.Tours
                .OrderBy(t => t.Nome)
                .Select(t => new TourResponseDto
                {
                    Id = t.Id,
                    Nome = t.Nome,
                    PrecoBase = t.PrecoBase,
                    Localizacao = t.Localizacao,
                    DuracaoHoras = t.DuracaoHoras,
                    ImagemUrl = t.ImagemUrl,
                    ValorTransfer = t.ValorTransfer,
                    Categoria = t.Categoria 
                })
                .ToListAsync();

            return Ok(tours);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<TourResponseDto>> GetById(Guid id)
        {
            // REMOVIDO: O filtro de Ativo
            var tour = await _context.Tours
                .Where(t => t.Id == id)
                .Select(t => new TourResponseDto
                {
                    Id = t.Id,
                    Nome = t.Nome,
                    PrecoBase = t.PrecoBase,
                    Localizacao = t.Localizacao,
                    DuracaoHoras = t.DuracaoHoras,
                    ImagemUrl = t.ImagemUrl,
                    ValorTransfer = t.ValorTransfer,
                    Categoria = t.Categoria
                })
                .FirstOrDefaultAsync();

            if (tour == null) return NotFound();

            return Ok(tour);
        }

        [HttpPost]
        public async Task<ActionResult> Create(TourCreateDto dto)
        {
            var tour = new Tour
            {
                Id = Guid.NewGuid(),
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                PrecoBase = dto.PrecoBase,
                Localizacao = dto.Localizacao,
                DuracaoHoras = dto.DuracaoHoras,
                IncluiTransporte = dto.IncluiTransporte,
                ValorTransfer = dto.IncluiTransporte ? dto.ValorTransfer : null,
                ImagemUrl = dto.ImagemUrl,
                Categoria = dto.Categoria ?? "Geral"
                // REMOVIDO: Ativo = true
            };

            _context.Tours.Add(tour);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = tour.Id }, tour.Id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, Tour tour) // AJUSTADO PARA ASYNC
        {
            if (tour.Id == Guid.Empty)
            {
                tour.Id = id;
            }

            if (id != tour.Id)
                return BadRequest("ID da rota diferente do ID do corpo da requisição");

            var existente = await _context.Tours.FindAsync(id);
            if (existente == null)
                return NotFound();

            // Atualização manual corrigida
            existente.Nome = tour.Nome;
            existente.Descricao = tour.Descricao;
            existente.PrecoBase = tour.PrecoBase;
            existente.Localizacao = tour.Localizacao;
            existente.DuracaoHoras = tour.DuracaoHoras;
            existente.IncluiTransporte = tour.IncluiTransporte;
            existente.ImagemUrl = tour.ImagemUrl;
            existente.ValorTransfer = tour.ValorTransfer;
            existente.Categoria = tour.Categoria; 

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var tour = await _context.Tours.FindAsync(id);
            if (tour == null) return NotFound();

            _context.Tours.Remove(tour); // O Hard Delete está correto aqui
            
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}