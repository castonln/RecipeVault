import { fetchData } from "./fetchData";

export async function signUp(credentials) {
    const response = await fetchData("/api/Authentication/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function logIn(credentials) {
    return await fetchData("/api/Authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
}
