namespace server.Models;

public partial class Recipe : BaseEntity
{
    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public decimal? Servings { get; set; }

    public decimal? ServingSize { get; set; }

    public decimal? PrepTime { get; set; }

    public decimal? CookTime { get; set; }

    public Guid CreatedBy { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<Instruction> Instructions { get; set; } = new List<Instruction>();

    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();

    public virtual ICollection<SharedRecipe> SharedRecipes { get; set; } = new List<SharedRecipe>();
}
