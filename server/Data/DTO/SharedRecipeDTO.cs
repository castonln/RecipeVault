using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class SharedRecipeDTO() : BaseEntityDTO
    {
        [JsonPropertyName("shareDate")]
        public DateOnly ShareDate { get; set; }

        [JsonPropertyName("sharedBy")]
        public Guid SharedBy { get; set; }

        [JsonPropertyName("sharedWith")]
        public Guid SharedWith { get; set; }

        [JsonPropertyName("recipeId")]
        public Guid RecipeId { get; set; }
    }
}
