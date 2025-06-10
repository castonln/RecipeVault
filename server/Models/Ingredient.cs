using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Ingredient : BaseEntity
{
    public string Name { get; set; } = null!;

    public decimal? FdaId { get; set; }

    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
}
