using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class SimpleRecipeDTO() : BaseEntityDTO
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = null!;

        [JsonPropertyName("description")]
        public string? Description { get; set; }

        [JsonPropertyName("servings")]
        public decimal? Servings { get; set; }

        [JsonPropertyName("servingSize")]
        public decimal? ServingSize { get; set; }

        [JsonPropertyName("prepTime")]
        public decimal? PrepTime { get; set; }

        [JsonPropertyName("cookTime")]
        public decimal? CookTime { get; set; }

        [JsonPropertyName("createdBy")]
        public Guid CreatedBy { get; set; }
    }
}
