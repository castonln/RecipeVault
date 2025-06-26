import { fetchData } from './fetchData';

export async function patchIngredients(created, updated, deleted) {
    const payload = {
        "createEntities": created,
        "updateEntities": updated,
        "deleteEntities": deleted
    }
    console.log(JSON.stringify(payload));

    const url = `/api/RecipeIngredients`;
    return await fetchData(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
}

export async function getIngredients() {
    const url = `/api/Ingredients`;
    return await fetchData(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

