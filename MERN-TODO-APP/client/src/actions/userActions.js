export async function register(previousState, formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");
        const name = formData.get("name");

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}user/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, name, password })
            }
        );

        const data = await res.json();
        if (data?.error) return { ...previousState, error: data.error }
        return { error: null, success: "User registered" };
    } catch (ex) {
        console.log(ex);
        return { ...previousState, error: "Something went wrong" }
    }
}

export async function login(previousState, formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}user/login`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
        );

        const data = await res.json();
        if (data?.error) return { ...previousState, error: data.error }
        return { error: null, success: "User logged in" };
    } catch (ex) {
        console.log(ex);
        return { ...previousState, error: "Something went wrong" }
    }
}