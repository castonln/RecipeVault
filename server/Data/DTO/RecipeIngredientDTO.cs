using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class RecipeIngredientDTO() : BaseEntityDTO
    {
        [JsonPropertyName("recipeId")]
        public Guid RecipeId { get; set; }

        [JsonPropertyName("ingredientId")]
        public Guid IngredientId { get; set; }

        [JsonPropertyName("quantity")]
        public decimal Quantity { get; set; }

        [JsonPropertyName("unit")]
        public string Unit { get; set; } = null!;

        [JsonPropertyName("ingredient")]
        public IngredientDTO? Ingredient { get; set; } = null!;
    }
}
