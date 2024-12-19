import { useNavigate } from "react-router-dom";

export const Categories = () => {
	const navigate = useNavigate();

	const categories = [
		{
			id: 1,
			name: "Electronics",
			image: "https://via.placeholder.com/300?text=Electronics",
		},
		{
			id: 2,
			name: "Fashion",
			image: "https://via.placeholder.com/300?text=Fashion",
		},
		{
			id: 3,
			name: "Home Appliances",
			image: "https://via.placeholder.com/300?text=Home+Appliances",
		},
		{
			id: 4,
			name: "Books",
			image: "https://via.placeholder.com/300?text=Books",
		},
		{
			id: 5,
			name: "Sports",
			image: "https://via.placeholder.com/300?text=Sports",
		},
		{
			id: 6,
			name: "Toys",
			image: "https://via.placeholder.com/300?text=Toys",
		},
	];

	return (
		<div className="mt-[10vh] min-h-screen bg-gradient-to-r from-cyan-50 to-cyan-100 py-10">
			<h1 className="text-center md:text-6xl text-4xl font-extrabold text-gray-800 mb-12 tracking-wide">
				Shop by Categories
			</h1>

			<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[90vw] mx-auto">
				{categories.map((category) => (
					<div
						key={category.id}
						onClick={() => navigate(`/product/byCategory/${category.name}`)}
						className="relative bg-white rounded-xl overflow-hidden shadow-md transform hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer"
					>
						<div className="relative">
							<img
								src={category.image}
								alt={category.name}
								className="w-full h-56 object-cover"
							/>
							<div
								className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
								<span className="text-white text-xl font-semibold">
									Explore {category.name}
								</span>
							</div>
						</div>
						<div className="p-4 text-center">
							<h2 className="text-xl font-semibold text-gray-700">
								{category.name}
							</h2>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
