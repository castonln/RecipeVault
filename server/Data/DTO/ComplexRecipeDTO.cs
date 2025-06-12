using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class ComplexRecipeDTO()
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

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

        [JsonPropertyName("instructions")]
        public List<InstructionDTO> Instructions { get; set; } = [];

        [JsonPropertyName("recipeIngredients")]
        public List<RecipeIngredientDTO> RecipeIngredients { get; set; } = [];
    }
}
