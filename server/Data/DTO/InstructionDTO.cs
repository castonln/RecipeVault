using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class InstructionDTO()
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("instructionNumber")]
        public decimal InstructionNumber { get; set; }

        [JsonPropertyName("recipeId")]
        public Guid RecipeId { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; } = null!;
    }
}
