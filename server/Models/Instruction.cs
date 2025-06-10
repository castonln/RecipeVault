using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Instruction : BaseEntity
{
    public decimal InstructionNumber { get; set; }

    public Guid RecipeId { get; set; }

    public string Description { get; set; } = null!;

    public virtual Recipe Recipe { get; set; } = null!;
}
