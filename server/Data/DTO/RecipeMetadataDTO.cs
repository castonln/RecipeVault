using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class RecipeMetadataDTO()
    {
        [JsonPropertyName("calories")]
        public decimal Calories { get; set; }

        [JsonPropertyName("protein")]
        public decimal Protein { get; set; }

        [JsonPropertyName("carbs")]
        public decimal Carbs { get; set; }

        [JsonPropertyName("fats")]
        public decimal Fats { get; set; }
    }
}
