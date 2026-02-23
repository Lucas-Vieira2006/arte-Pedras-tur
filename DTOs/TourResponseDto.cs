namespace Turismo.Api.DTOs
{
  public class TourResponseDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public decimal PrecoBase { get; set; }
        public string Localizacao { get; set; } = string.Empty;
        public int DuracaoHoras { get; set; }
        public string ImagemUrl { get; set; } = string.Empty;
        public bool Ativo { get; set; } = true;
        public bool IncluiTransporte { get; set; }
        public decimal? ValorTransfer { get; set; }
        public string Categoria { get; set; } = string.Empty;

    }
}
