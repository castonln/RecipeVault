using System;
using System.Collections.Generic;

namespace server.Models;

public partial class user
{
    public Guid id { get; set; }

    public string username { get; set; } = null!;

    public string password_hash { get; set; } = null!;

    public DateOnly created_at { get; set; }

    public string email { get; set; } = null!;
}
