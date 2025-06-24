import { fetchData } from "./fetchData";

export async function signUp(credentials) {
    return await fetchData("/api/Authentication/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
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
