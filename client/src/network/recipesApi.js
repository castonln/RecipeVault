import { fetchData } from "./fetchData";

export async function getRecipes(userId) {
    const url = `/api/Recipes?userId=${userId}`;

    return await fetchData(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function postRecipe(userId, data) {
    const url = `/api/Recipes?userId=${userId}`;

    return await fetchData(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export async function getRecipe(recipeId, userId) {
    const url = `/api/Recipes/${recipeId}?userId=${userId}`;

    return await fetchData(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function deleteRecipe(recipeId, userId) {
    const url = `/api/Recipes/${recipeId}?userId=${userId}`;

    return await fetchData(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function modifyRecipe(userId, recipeId, data) {
    const url = `/api/Recipes/?userId=${userId}`;

    return await fetchData(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": data.title,
            "description": data.description,
            "servings": 0,    
            "servingSize": 0, 
            "prepTime": data.prepTime,
            "cookTime": data.cookTime,
            "createdBy": userId,
            "id": recipeId
        }),
    });
}
