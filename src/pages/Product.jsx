import { useState } from "react";

export const Product = () => {
	const [products] = useState([
		{
			id: 1,
			name: "Wireless Headphones",
			price: 49.99,
			image: "https://via.placeholder.com/300",
			description: "High-quality wireless headphones with noise cancellation.",
		},
		{
			id: 2,
			name: "Smart Watch",
			price: 99.99,
			image: "https://via.placeholder.com/300",
			description: "Stylish smart watch with fitness tracking features.",
		},
		{
			id: 3,
			name: "Bluetooth Speaker",
			price: 29.99,
			image: "https://via.placeholder.com/300",
			description: "Portable speaker with excellent sound quality.",
		},
		{
			id: 4,
			name: "Gaming Mouse",
			price: 39.99,
			image: "https://via.placeholder.com/300",
			description: "Ergonomic mouse designed for precision and comfort.",
		},
	]);

	return (
		<div className="min-h-screen mt-[10vh] bg-gradient-to-r from-cyan-50 to-cyan-100 py-10">
			{/* Page Title */}
			<h1 className="text-center p-2 md:p-0 md:text-6xl text-4xl font-extrabold mb-12 tracking-widest">
				Discover Our Products
			</h1>

			{/* Product Grid */}
			<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[90vw] mx-auto">
				{products.map((product) => (
					<div
						key={product.id}
						className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300"
					>
						{/* Product Image */}
						<div className="relative">
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-64 object-cover rounded-t-lg"
							/>
							<div className="absolute top-0 right-0 bg-cyan-600 text-white px-3 py-1 text-sm font-bold rounded-bl-lg">
								${product.price.toFixed(2)}
							</div>
						</div>

						{/* Product Details */}
						<div className="p-6">
							<h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
							<p className="text-gray-400 text-sm mb-4">
								{product.description}
							</p>

							{/* Add to Cart Button */}
							<button className="w-full bg-cyan-600 text-white py-2 rounded-md text-lg font-medium hover:bg-cyan-700 transition">
								Add to Cart
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
