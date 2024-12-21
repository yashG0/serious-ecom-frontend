const BASE_URL = 'http://localhost:8000';


export const addCartItemsToOrder = async (cartItems) => {
	try {
		// Assuming the cartItems contain the relevant details (like product_id and quantity)
		const orderData = {
			items: cartItems.map(item => ({
				product_id: item.product_id,
				quantity: item.quantity,
			})),
		};

		const token = localStorage.getItem("token"); // Fetch the token from localStorage

		if (!token) {
			throw new Error("User is not authenticated.");
		}

		const response = await fetch("http://127.0.0.1:8000/api/order/create_order", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(orderData),
		});

		if (response.ok) {
			const result = await response.json();
			console.log("Order created successfully:", result);
			alert("Order created successfully!");
		} else {
			const error = await response.json();
			console.error("Failed to create order:", error);
			alert("Failed to create order.");
		}
	} catch (error) {
		console.error("Error adding items to order:", error.message);
		alert("An error occurred while creating the order.");
	}
};


export const fetchAllOrders = async () => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('User is not authenticated.');
		}

		// Wait for fetch to complete
		const res = await fetch(`${BASE_URL}/api/order/all`, {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		});

		// Check if response is okay
		if (!res.ok) {
			throw new Error('Failed to fetch orders');
		}

		// Return the response JSON
		return await res.json();
	} catch (e) {
		// Handle errors and rethrow with a specific message
		throw new Error('Error fetching orders: ' + e.message);
	}
};


export const removeOrder = async (order_id) => {
	try {
		// Get the token from localStorage for authentication
		const token = localStorage.getItem('token');

		if (!token) {
			throw new Error('User is not authenticated.');
		}

		// Perform the DELETE request to remove the order
		const response = await fetch(`http://localhost:8000/api/order/remove/${order_id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
			},
		});

		// Check if the response is successful
		if (!response.ok) {
			throw new Error('Failed to remove the order.');
		}

		if (response.status === 204) {
			alert("Order removed successfully!");
		}

	} catch (error) {
		// Handle errors and show appropriate message
		console.error('Error removing order:', error.message);
		throw error;
	}
};
