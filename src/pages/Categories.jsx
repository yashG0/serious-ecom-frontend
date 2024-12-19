import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchCategories} from "../api/category_handler.js";
import {
	ComputerDesktopIcon,
	HomeModernIcon,
	BookOpenIcon,
	TrophyIcon,
} from "@heroicons/react/24/solid";
import {FaShirt} from "react-icons/fa6";


export const Categories = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getCategories = async () => {
			try {
				const fetchedCategories = await fetchCategories();
				setCategories(fetchedCategories);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		getCategories();
	}, []);

	if (loading) {
		return <div>Loading categories...</div>; // Or a loading spinner
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const categoryIcons = {
		Electronics: <ComputerDesktopIcon className="w-12 h-12" />,
		Kitchen: <HomeModernIcon className="w-12 h-12" />,
		Books: <BookOpenIcon className="w-12 h-12" />,
		Sports: <TrophyIcon className="w-12 h-12" />,
		Clothing: <FaShirt className="w-12 h-12" />,
		// Add more categories and icons as needed
	};

	return (
		<div className="mt-[10vh] min-h-screen bg-gradient-to-r from-cyan-50 to-cyan-100 py-10">
			<h1 className="text-center md:text-6xl text-4xl font-extrabold text-gray-800 mb-12 tracking-wide">
				Shop by Categories
			</h1>

			<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[90vw] mx-auto">
				{categories.map((category) => (
					<div
						key={category.id}
						onClick={() => navigate(`/product/byCategory/${category.id}`)}
						className="relative bg-white rounded-xl overflow-hidden shadow-lg transition duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl p-8 flex flex-col items-center justify-center"
					>
						{/* Category Name with Icon */}
						<div className="mb-4">
              <span className="text-4xl text-cyan-500">
                {categoryIcons[category.name] || (
	                // Fallback icon if no match is found
	                <svg
		                xmlns="http://www.w3.org/2000/svg"
		                fill="none"
		                viewBox="0 0 24 24"
		                strokeWidth={1.5}
		                stroke="currentColor"
		                className="w-12 h-12"
	                >
		                <path
			                strokeLinecap="round"
			                strokeLinejoin="round"
			                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
		                />
	                </svg>
                )}
              </span>
						</div>

						{/* Category Description (Optional) */}
						{category.description && (
							<div className="mt-4 text-center">
								<p className="text-gray-600 text-sm">
									{category.description}
								</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>  );
};
