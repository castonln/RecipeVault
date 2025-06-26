import { v4 as uuidv4 } from 'uuid';

const createIngredientObject = (ingredient, quantity, unit, id, recipeId) => {

    return (
        {
            "id": id,
            "recipeId": recipeId,
            "ingredientId": ingredient.id,
            "quantity": quantity,
            "unit": unit,
            "ingredient": ingredient
        }
    )
}

export default createIngredientObject;