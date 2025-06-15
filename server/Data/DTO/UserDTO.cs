using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class UserDTO() : BaseEntityDTO
    {
        [JsonPropertyName("username")]
        public string Username { get; set; } = null!;

        [JsonPropertyName("passwordHash")]
        public string PasswordHash { get; set; } = null!;

        [JsonPropertyName("createdAt")]
        public DateOnly CreatedAt { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; } = null!;
    }
}
