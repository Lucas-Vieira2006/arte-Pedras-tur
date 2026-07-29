namespace Turismo.Api.DTOs;

 public class TourCreateDto
{
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public decimal PrecoBase { get; set; } 
    public string Localizacao { get; set; } = string.Empty;
    public int DuracaoHoras { get; set; }
    public bool IncluiTransporte { get; set; }
    public decimal? ValorTransfer { get; set; }
    public string ImagemUrl { get; set; } = string.Empty;
    public bool Ativo { get; set; } = true;
    public string Categoria { get; set; } = string.Empty;
}