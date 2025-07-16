namespace server.Models;

public partial class User : BaseEntity
{
    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public DateOnly CreatedAt { get; set; }

    public string Email { get; set; } = null!;

    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();

    public virtual ICollection<SharedRecipe> SharedRecipeSharedByNavigations { get; set; } = new List<SharedRecipe>();

    public virtual ICollection<SharedRecipe> SharedRecipeSharedWithNavigations { get; set; } = new List<SharedRecipe>();
}
