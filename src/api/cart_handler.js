const BASE_URL = 'http://localhost:8000';

export const addCart = async () => {
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			throw new Error('User is not authenticated.');
		}

		const res = await fetch(`${BASE_URL}/api/cart/add_cart`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});
		if (!res.ok) {
			throw new Error('Something went wrong!');
		}
		return res.status === 200;
	} catch (e) {
		console.error(e);
		throw new Error('Error while creating new cart: ' + e.message);
	}
}


export const removeCart = async () => {
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			throw new Error('User is not authenticated.');
		}

		const res = await fetch(`${BASE_URL}/api/cart/remove_cart`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			throw new Error('Something went wrong!');
		}
		return res.status === 204;
	} catch (e) {
		console.error(e);
		throw new Error('Error while removing cart: ' + e.message);
	}
}


export const getCart = async () => {
	try {
		const token = localStorage.getItem('token');

		if (!token) {
			throw new Error('User is not authenticated.');
		}

		const res = await fetch(`${BASE_URL}/api/cart/get_cart`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		})

		if (!res.ok) {
			throw new Error('Something went wrong!');
		}
		return res.status === 200;

	} catch (e) {
		console.error(e);
		throw new Error('Error while getting cart: ' + e.message);
	}
}


export const getCartItems = async () => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('User is not authenticated.');
		}
		const res = await fetch(`${BASE_URL}/api/cart/get_cart_items`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});
		if (!res.ok) {
			throw new Error('Something went wrong!');
		}
		return await res.json();
	} catch (e) {
		console.error(e);
		throw new Error('Error while getting cart items: ' + e.message);
	}
}


export const addItemToCart = async (cartDetail) => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('User is not authenticated.');
		}

		const res = await fetch(`${BASE_URL}/api/cart/add_cart_item`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify({
				"product_id": cartDetail.product_id,
				"quantity": cartDetail.quantity,
			}),
		});

		if (!res.ok) {
			throw new Error('Failed to add item to cart');
		}
		alert("Your Item has been added to the cart!")
		return res.status === 201;
	} catch (e) {
		console.error("Failed to add item to cart: " + e.message);
		throw new Error("Failed to add item to cart: " + e.message);
	}
}


export const updateItemInCart = async (itemId, quantity) => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('User is not authenticated.');
		}

		const res = await fetch(`${BASE_URL}/api/cart/update_cart_item/${itemId}?quantity=${quantity}`, {
			method: 'PUT',
			headers: {
				"Accept": "*/*",
				'Authorization': `Bearer ${token}`,
			},
		})

		if (!res.ok) {
			throw new Error('Failed to update item in cart');
		}
		return res.status === 204;
	} catch (e) {
		console.error("Failed to update item in cart: " + e.message);
		throw new Error("Failed to update item in cart: " + e.message);
	}
}


export const removeItemFromCart = async (cart_item_id) => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('User is not authenticated.');
	}

	const res = await fetch(`${BASE_URL}/api/cart/remove_cart_item/${cart_item_id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	});

	if (!res.ok) {
		throw new Error('Failed to remove item from cart');
	}
	alert("Your Item has been removed from the cart!")
	return res.status === 204;
}