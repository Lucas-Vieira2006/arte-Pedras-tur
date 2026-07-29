    using System;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.Json.Serialization;


    namespace Turismo.Api.Models
    {
        public class Tour
        {
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public Guid Id { get; set; }
            public string Nome { get; set; } = string.Empty;
            public string Descricao { get; set; } = string.Empty;
            public decimal PrecoBase { get; set; }
            public string Localizacao { get; set; } = string.Empty;
            public int DuracaoHoras { get; set; }
            public bool IncluiTransporte { get; set; }
            public decimal? ValorTransfer { get; set; }
    
            [NotMapped]
            [JsonIgnore]
            public decimal? ValorTransferEfetivo => IncluiTransporte ? ValorTransfer : null;
            public bool ValidarTransfer() => !IncluiTransporte || ValorTransfer > 0;
            public string ImagemUrl { get; set; } = string.Empty;
            public bool Ativo { get; set; } = true;
            public string Categoria { get; set; } = string.Empty;
            
        }
    }
