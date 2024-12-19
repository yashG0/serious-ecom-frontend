const BASE_URL = "http://127.0.0.1:8000";

export const fetchCategories = async () => {
	try {
		const res = await fetch(`${BASE_URL}/api/category/all`);

		if (!res.ok) {
			if (res.status === 404) {
				throw new Error("Categories not found!");
			} else {
				const errorData = await res.json(); // Try to get error details
				const serverErrorMessage = errorData?.message || "Unknown server error";
				throw new Error(`Failed to fetch categories: ${serverErrorMessage} (status: ${res.status})`);
			}
		}

		return await res.json();

	} catch (e) {
		console.error(e); // Log the full error object
		return []; // Or return null
	}
};


export const fetchCategoryById = async (id) => {
	try {
		const res = await fetch(`${BASE_URL}/api/category/${id}`);
		if (!res.ok) {
			throw new Error("Category not found!");
		}
		return await res.json();
	} catch (e) {
		console.error(e);
		return null
	}
}