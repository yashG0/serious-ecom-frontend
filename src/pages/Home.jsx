import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchAllProducts} from "../api/product_handler.js";
import {useSelector} from "react-redux";

export const Home = () => {

	const [products, setProducts] = useState([]);
	const authStatus = useSelector(state => state.auth.value);

	useEffect(() => {
		fetchAllProducts().then((res) => setProducts(res)).catch((err) => console.error(err));
	}, []);

	return (
		<>
			<div className="mt-[10vh] min-h-screen w-full bg-gradient-to-r from-cyan-50 to-cyan-200">
				{/* Hero Section */}
				<div className="w-[85%] mx-auto py-10 flex flex-col items-center">
					<div className="text-center">
						<h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-widest">
							Welcome to UrbanCart Shop
						</h1>
						<p className="mt-4 text-lg md:text-xl text-gray-600">
							Discover amazing products at unbeatable prices.
						</p>
					</div>
					<Link to={"/product"}>
						<button
							className="mt-8 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition duration-300">
							Shop Now
						</button>
					</Link>
				</div>

				{/* Featured Products */}
				<div className="w-[85%] mx-auto mt-10">
					<h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
						Featured Products
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{/* Example Product Cards */}
						{products.slice(0, 4).map((item, key) => (
							<div
								key={key}
								className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
							>
								<img
									src={`https://via.placeholder.com/200?text=Product`}
									alt={`Product ${item.name}`}
									className="w-full h-48 object-cover"
								/>
								<div className="p-4">
									<h3 className="text-lg font-semibold text-white">
										{item.name.toUpperCase()}
									</h3>
									<p className="mt-2 text-gray-100">Rs.{item.price}</p>
									<button
										className="mt-4 px-4 py-2 w-full bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition duration-300">
										Add to Cart
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Call to Action */}
				<div className="mt-20 p-20 from-cyan-700 to-cyan-900 bg-gradient-to-r  text-center text-white">
					<h2 className="text-2xl md:text-4xl font-bold">
						Ready to start shopping?
					</h2>
					<Link to={!authStatus?"/login":"/product"}>
						<button
							className="mt-6 px-6 py-3 bg-white text-cyan-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300">
							Get Started
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};
