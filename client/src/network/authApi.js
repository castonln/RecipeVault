export async function signUp(credentials) {
    return await fetch("/api/Authentication/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
}

export async function logIn(credentials) {
    return await fetch("/api/Authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
}
