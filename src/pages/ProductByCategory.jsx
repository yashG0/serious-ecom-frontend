import {useParams} from "react-router-dom";

const products = [
	{
		id: 1,
		name: "Laptop",
		category: "Electronics",
		image: "https://via.placeholder.com/300",
		price: 999.99,
		description: "A high-performance laptop perfect for work, gaming, and entertainment.",
	},
	{
		id: 2,
		name: "T-shirt",
		category: "Fashion",
		image: "https://via.placeholder.com/300",
		price: 20.0,
		description: "A comfortable and stylish t-shirt suitable for all occasions.",
	},
	{
		id: 3,
		name: "Washing Machine",
		category: "Home Appliances",
		image: "https://via.placeholder.com/300",
		price: 300.0,
		description: "An efficient washing machine with advanced cleaning features.",
	},
	{
		id: 4,
		name: "Novel",
		category: "Books",
		image: "https://via.placeholder.com/300",
		price: 15.0,
		description: "A captivating novel that will keep you hooked from start to finish.",
	},
	{
		id: 5,
		name: "Football",
		category: "Sports",
		image: "https://via.placeholder.com/300",
		price: 25.0,
		description: "A durable football perfect for matches and training sessions.",
	},
	{
		id: 6,
		name: "Toy Car",
		category: "Toys",
		image: "https://via.placeholder.com/300",
		price: 10.0,
		description: "A fun and safe toy car for kids of all ages to enjoy.",
	},
];

export const ProductByCategory = () => {
	const {categoryName} = useParams();
	const filteredProducts = products.filter((product) => product.category.toLowerCase() === categoryName.toLowerCase()
	);

	return (
		<div className="min-h-screen mt-[10vh] bg-gradient-to-r from-cyan-50 to-cyan-100 py-10">
			<h1 className="text-center p-2 md:p-0 md:text-6xl text-4xl font-extrabold mb-12 tracking-widest">
				Products in {categoryName}
			</h1>

			{filteredProducts.length === 0 ? (
				<p className="text-center text-gray-600">
					No products available in this category.
				</p>
			) : (
				<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[90vw] mx-auto">
					{filteredProducts.map((product) => (
						<div
							key={product.id}
							className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300"
						>
							<div className="relative">
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-64 object-cover rounded-t-lg"
								/>
								<div
									className="absolute top-0 right-0 bg-cyan-600 text-white px-3 py-1 text-sm font-bold rounded-bl-lg">
									${product.price.toFixed(2)}
								</div>
							</div>

							<div className="p-6">
								<h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
								<p className="text-gray-400 text-sm mb-4">
									{product.description}
								</p>
								<button
									className="w-full bg-cyan-600 text-white py-2 rounded-md text-lg font-medium hover:bg-cyan-700 transition">
									Add to Cart
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
