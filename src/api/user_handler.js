const BASE_URL = "http://127.0.0.1:8000";


export const fetchUserInfo = async () => {
	try {
		const token = localStorage.getItem('token'); // Get token from localStorage (or Redux store if you're using that)

		if (!token) {
			throw new Error('User is not authenticated.');
		}

		const res = await fetch(`${BASE_URL}/api/user/me`, {
			method: 'GET',
			headers: {
				'accept': 'application/json',
				'Authorization': `Bearer ${token}`, // Attach the token to the Authorization header
			},
		});

		if (!res.ok) {
			throw new Error('Failed to fetch user information');
		}

		const userData = await res.json();

		// You can use this data, e.g., store it in Redux or state
		console.log('User Info:', userData);

		return userData;
	} catch (e) {
		console.error('Error fetching user info:', e.message);
		throw new Error('Error fetching user info: ' + e.message);
	}
};

export const changePassword = async (currentPassword, newPassword) => {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("User is not authenticated.");
	}

	try {
		const res = await fetch(`${BASE_URL}/api/user/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
			},
			body: JSON.stringify({
				old_password: currentPassword,
				new_password: newPassword,
				confirm_password: newPassword,
			}),
		});

		if (!res.ok) {
			throw new Error("Failed to change password");
		}

		if (res.status === 204){
			console.log("Password changed successfully", res.status);
		}

	} catch (err) {
		throw new Error("Error changing password: " + err.message);
	}
};
