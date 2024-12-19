const BASE_URL = "http://127.0.0.1:8000";

export const fetchAllProducts = async () => {
	try {
		const res = await fetch(`${BASE_URL}/api/product/all`);

		if (!res.ok) {
			if (res.status === 404) {
				throw new Error("Products not found!");
			} else {
				const errorData = await res.json(); // Try to get error details from the server
				const serverErrorMessage = errorData?.message || "Unknown server error";
				throw new Error(`Failed to fetch products: ${serverErrorMessage} (status: ${res.status})`);
			}
		}

		return await res.json();

	} catch (e) {
		console.error(e); // Log the full error object
		return []; // Or return null
	}
};

export const fetchProductById = async (id) => {
	try {
		const res = await fetch(`${BASE_URL}/api/product/${id}`);
		if (!res.ok) {
			throw new Error("Product not found!");
		}
		return await res.json();
	} catch (e) {
		console.error(e);
		return null
	}
}