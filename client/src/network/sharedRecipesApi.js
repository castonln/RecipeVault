const API_URL = import.meta.env.VITE_API_URL;

export async function postRecipeShare(userId, sharedUserId, recipeId) {
    const url = `${API_URL}/SharedRecipes?userId=${userId}`;

    const payload = JSON.stringify({
        "sharedWith": sharedUserId,
        "recipeId": recipeId
    });

    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: payload,
    });
}

export async function getSharedRecipes(userId) {
    const url = `${API_URL}/SharedRecipes?userId=${userId}`;

    return await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function deleteRecipeShare(recipeId, userId) {
    const url = `${API_URL}/SharedRecipes/${recipeId}?userId=${userId}`;

    return await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function getUsersSharedWith(recipeId, userId) {
    const url = `${API_URL}/SharedRecipes/${recipeId}/shared-with?userId=${userId}`;

    return await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}