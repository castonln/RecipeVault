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

    public virtual ICollection<Instruction> Instructions { get; set; } = [];

    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = [];
}
