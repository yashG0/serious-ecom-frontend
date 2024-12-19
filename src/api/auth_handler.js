const BASE_URL = "http://127.0.0.1:8000";

export const login = async (credentials) => {
	try {
		const formBody = new URLSearchParams();
		formBody.append("grant_type", "password");
		formBody.append("username", credentials.username);
		formBody.append("password", credentials.password);
		formBody.append("scope", "");
		formBody.append("client_id", "string");
		formBody.append("client_secret", "string");

		const res = await fetch(`${BASE_URL}/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded", // Make sure the correct content type is set
				"Accept": "application/json",
			},
			body: formBody,
		});

		if (!res.ok) {
			throw new Error(`Login failed with status code ${res.status}`);
		}

		const data = await res.json();

		if (data.access_token) {
			localStorage.setItem("token", data.access_token); // Store the token
			console.log("Logged in successfully", data);
			return data;
		} else {
			throw new Error("No access token returned from the backend");
		}

	} catch (e) {
		console.error("Login Error: ", e.message);
		throw new Error("Error logging in: " + e.message);
	}
};

export const signup = async (userDetails) => {
	try {
		const res = await fetch(`${BASE_URL}/api/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userDetails),
		});

		if (!res.ok) {
			throw new Error(`Signup failed with status code ${res.status}`);
		}

		if (res.status === 201) {
			const message = "User created successfully";
			console.log(message);
			return message;
		}

		return await res.json();
	} catch (e) {
		console.error("Signup Error:", e.message);
		throw new Error("Error creating user details: " + e.message);
	}
};
