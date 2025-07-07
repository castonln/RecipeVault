const createIngredientObject = (ingredientId, quantity, unit, id, recipeId) => {

    return (
        {
            "id": id,
            "recipeId": recipeId,
            "ingredientId": ingredientId, 
            "quantity": quantity,
            "unit": unit,
        }
    )
}

export default createIngredientObject;