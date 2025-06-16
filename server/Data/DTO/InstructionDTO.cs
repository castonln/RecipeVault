using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class InstructionDTO() : BaseEntityDTO
    {
        [JsonPropertyName("instructionNumber")]
        public decimal InstructionNumber { get; set; }

        [JsonPropertyName("recipeId")]
        public Guid RecipeId { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; } = null!;
    }
}
