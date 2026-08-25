using System.ComponentModel.DataAnnotations;

namespace Turismo.Api.DTOs;

public class TourUpdateDto : IValidatableObject
{
    [Required, StringLength(200)]
    public string Nome { get; set; } = string.Empty;

    [StringLength(20000)]
    public string Descricao { get; set; } = string.Empty;

    [Range(0, double.MaxValue)]
    public decimal PrecoBase { get; set; }

    [StringLength(300)]
    public string Localizacao { get; set; } = string.Empty;

    [Range(1, int.MaxValue)]
    public int DuracaoHoras { get; set; }

    public bool IncluiTransporte { get; set; }

    [Range(0, double.MaxValue)]
    public decimal? ValorTransfer { get; set; }

    [Required, StringLength(1000)]
    public string ImagemUrl { get; set; } = string.Empty;

    public bool Ativo { get; set; } = true;

    [StringLength(100)]
    public string Categoria { get; set; } = string.Empty;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (IncluiTransporte && (ValorTransfer is null || ValorTransfer <= 0))
        {
            yield return new ValidationResult(
                "ValorTransfer é obrigatório e deve ser maior que zero quando IncluiTransporte é true.",
                new[] { nameof(ValorTransfer) });
        }
    }
}
