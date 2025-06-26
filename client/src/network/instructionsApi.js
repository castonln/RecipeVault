import { fetchData } from './fetchData';

export async function patchInstructions(payload) {
    console.log(JSON.stringify(payload));
    const url = `/api/Instructions`;
    return await fetchData(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
}