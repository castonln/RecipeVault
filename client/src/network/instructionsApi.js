const API_URL = import.meta.env.VITE_API_URL;

export async function patchInstructions(payload) {
    //console.log(JSON.stringify(payload));
    const url = `${API_URL}/Instructions`;
    return await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
}