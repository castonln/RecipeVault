using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class Login
    {
        [JsonPropertyName("username")]
        public string Username { get; set; } = null!;

        [JsonPropertyName("password")]
        public string Password { get; set; } = null!;
    }
}
