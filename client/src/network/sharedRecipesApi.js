const API_URL = import.meta.env.VITE_API_URL;

export async function postSharedRecipes(userId, sharedUserId, recipeId) {
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