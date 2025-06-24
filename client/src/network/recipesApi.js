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
