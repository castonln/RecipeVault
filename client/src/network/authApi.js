const API_URL = import.meta.env.VITE_API_URL;

export async function signUp(credentials) {
    return await fetch(`${API_URL}/Authentication/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
}

export async function logIn(credentials) {
    console.log(import.meta.env.VITE_API_URL);
    return await fetch(`${API_URL}/Authentication/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
}
