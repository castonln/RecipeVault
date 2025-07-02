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

        [JsonPropertyName("servingSize")]
        public decimal? ServingSize { get; set; }

        [JsonPropertyName("unit")]
        public string? Unit { get; set; }

        [JsonPropertyName("calories")]
        public decimal? Calories { get; set; }

        [JsonPropertyName("carbs")]
        public decimal? Carbs { get; set; }

        [JsonPropertyName("protein")]
        public decimal? Protein { get; set; }

        [JsonPropertyName("fats")]
        public decimal? Fats { get; set; }
    }
}
