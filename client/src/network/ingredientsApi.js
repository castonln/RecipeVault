export async function patchIngredient(action, ingredient) {
    let payload = {
        "createEntities": [],
        "updateEntities": [],
        "deleteEntities": []
    }

    if (action === 'create') {
        payload.createEntities = [ingredient];
    } else if (action === 'update') {
        payload.updateEntities = [ingredient];
    } else if (action === 'delete') {
        payload.deleteEntities = [ingredient];
    } else {
        throw new Error(`Invalid action: ${action}. Expected 'create', 'update', or 'delete'.`);
    }
    
    //console.log(JSON.stringify(payload));

    const url = `/api/RecipeIngredients`;
    return await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
}

export async function getIngredients() {
    const url = `/api/Ingredients`;
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

