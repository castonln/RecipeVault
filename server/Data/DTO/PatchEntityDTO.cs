using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class PatchEntityDTO<TEntityDTO> where TEntityDTO : BaseEntityDTO
    {
        [JsonPropertyName("createEntities")]
        public List<TEntityDTO> CreateEntities { get; set; } = [];

        [JsonPropertyName("updateEntities")]
        public List<TEntityDTO> UpdateEntities { get; set; } = [];

        [JsonPropertyName("deleteEntities")]
        public List<TEntityDTO> DeleteEntities { get; set; } = [];
    }
}
