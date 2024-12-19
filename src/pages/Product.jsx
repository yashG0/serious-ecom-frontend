import { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/product_handler.js";

export const Product = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const fetchedProducts = await fetchAllProducts();
				setProducts(fetchedProducts);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		getProducts();
	}, []);

	if (loading) {
		return <div>Loading products...</div>; // Or a loading spinner
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="min-h-screen mt-[10vh] bg-gradient-to-r from-cyan-50 to-cyan-100 py-10">
			{/* Page Title */}
			<h1 className="text-center p-2 md:p-0 md:text-6xl text-4xl font-extrabold mb-12 tracking-widest">
				Discover Our Products
			</h1>

			{/* Product Grid */}
			<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[90vw] mx-auto">
				{products.map((product) => (
					<div key={product.id} className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:shadow-xl transition duration-300">
						{/* Product Image */}
						<div className="relative">
							<img
								src={`https://via.placeholder.com/200?text=Product`}
								alt={`Product ${product.name}`}
								className="w-full h-48 object-cover"
							/>
							<div className="absolute top-0 right-0 bg-cyan-600 text-white px-3 py-1 text-sm font-bold rounded-bl-lg">
								${product.price.toFixed(2)}
							</div>
						</div>

						{/* Product Details */}
						<div className="p-6">
							<h2 className="text-xl font-bold text-white mb-2">
								{product.name}
							</h2>
							<p className="text-white text-sm mb-4">
								{product.description}
							</p>

							{/* Add to Cart Button */}
							<button className="w-full bg-cyan-700  text-white py-2 rounded-md text-lg font-medium hover:bg-cyan-800 transition">
								Add to Cart
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};