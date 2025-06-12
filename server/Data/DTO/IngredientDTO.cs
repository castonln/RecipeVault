using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class IngredientDTO()
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = null!;

        [JsonPropertyName("fdaId")]
        public decimal? FdaId { get; set; }
    }
}
