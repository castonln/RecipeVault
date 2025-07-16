namespace server.Models;

public partial class SharedRecipe : BaseEntity
{
    public DateOnly ShareDate { get; set; }

    public Guid SharedBy { get; set; }

    public Guid SharedWith { get; set; }

    public Guid RecipeId { get; set; }

    public virtual Recipe Recipe { get; set; } = null!;

    public virtual User SharedByNavigation { get; set; } = null!;

    public virtual User SharedWithNavigation { get; set; } = null!;
}
