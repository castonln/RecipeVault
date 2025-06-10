using System;
using System.Collections.Generic;

namespace server.Models;

public partial class RecipeIngredient : BaseEntity
{
    public Guid RecipeId { get; set; }

    public Guid IngredientId { get; set; }

    public decimal Quantity { get; set; }

    public string Unit { get; set; } = null!;

    public virtual Ingredient Ingredient { get; set; } = null!;

    public virtual Recipe Recipe { get; set; } = null!;
}
