const API_URL = import.meta.env.VITE_API_URL;

export async function getUsers() {
    const url = `${API_URL}/Users`;

    return await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}