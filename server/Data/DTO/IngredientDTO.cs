using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class IngredientDTO() : BaseEntityDTO
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = null!;

        [JsonPropertyName("fdaId")]
        public decimal? FdaId { get; set; }
    }
}
