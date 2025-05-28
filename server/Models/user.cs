using System;
using System.Collections.Generic;

namespace server.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public DateOnly CreatedAt { get; set; }

    public string Email { get; set; } = null!;
}
