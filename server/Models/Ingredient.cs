namespace server.Models;

public partial class Ingredient : BaseEntity
{
    public string Name { get; set; } = null!;

    public decimal? FdaId { get; set; }

    public decimal? ServingSize { get; set; }

    public string? Unit { get; set; }

    public decimal? Calories { get; set; }

    public decimal? Carbs { get; set; }

    public decimal? Protein { get; set; }

    public decimal? Fats { get; set; }

    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
}
