using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Ingredient
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public decimal? FdaId { get; set; }

    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
}
