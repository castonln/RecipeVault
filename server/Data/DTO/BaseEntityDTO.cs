using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    public class BaseEntityDTO
    {
        [JsonPropertyName("id")]
        public Guid? Id { get; set; }
    }
}
