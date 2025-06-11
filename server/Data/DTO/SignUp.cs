using System.Text.Json.Serialization;

namespace server.Data.DTO
{
    [Serializable]
    public class SignUp
    {
        [JsonPropertyName("username")]
        public string Username { get; set; } = null!;

        [JsonPropertyName("email")]
        public string Email { get; set; } = null!;

        [JsonPropertyName("password")]
        public string Password { get; set; } = null!;
    }
}