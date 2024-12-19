import {HiMenuAlt3} from "react-icons/hi";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const authStatus = useSelector(state => state.auth.value);

	const navLinks = [
		{name: "Home", link: "/"},
		{name: "Product", link: "/product"},
		{name: "Categories", link: "/categories"},
		{name: "Cart", link: "/cart"},
		{name: "Order", link: "/order"},
	];


	return (
		<div
			className={`w-full h-[10vh] from-cyan-700 to-cyan-900 bg-gradient-to-r shadow-md fixed top-0 z-50`}>

			{/* Navbar Container */}
			<div className="flex justify-between items-center w-[90vw] h-full mx-auto">

				{/* App Icon */}
				<span className="text-2xl md:text-4xl font-bold text-white tracking-wider">
					<Link to="/">
					<span className="bg-white text-cyan-700 px-2 py-1 rounded-md shadow-sm">E</span>-Shop
					</Link>
				</span>

				{/* Nav Links */}
				<ul
					className={`lg:flex lg:space-x-6 space-y-2 lg:space-y-0 py-2 lg:py-0 capitalize font-medium lg:static absolute top-[10vh] left-0 lg:top-0 lg:left-auto lg:bg-transparent bg-cyan-600 w-full lg:w-auto transition-all duration-300 ${
						isMenuOpen ? "block" : "hidden"
					}`}
				>
					{navLinks.map((link, index) => (
						<li
							key={index}
							className="hover:font-bold text-white cursor-pointer hover:underline lg:p-0 text-center"
							onClick={() => setIsMenuOpen(false)} // Close menu on click
						>
							<Link to={link.link}>{link.name}</Link>
						</li>
					))}
				</ul>

				{/* Account Info */}
				<div className="flex space-x-4 items-center">

					{authStatus ? (
						<>
							<Link to="/account">
								<button
									className="p-2 px-4 bg-white text-cyan-800 rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg">
									My Account
								</button>
							</Link>
							<Link to="/logout">
								<button
									className="p-2 px-4 bg-white text-cyan-800 rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg">
									Log out
								</button>
							</Link>
						</>
					) : (
						<>
							<Link to="/login">
								<button
									className="p-2 md:text-xl text-sm md:px-4 bg-white text-cyan-800 rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg">
									Login
								</button>
							</Link>
							<Link to="/signup">
								<button
									className="p-2 md:text-xl text-sm md:px-4 bg-white text-cyan-800 rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg">
									Sign up
								</button>
							</Link>
						</>
					)}

					{/* Mobile Menu Toggle */}
					<div
						className="lg:hidden cursor-pointer text-white hover:text-gray-200 transition"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<HiMenuAlt3 size={28}/>
					</div>
				</div>
			</div>
		</div>
	);
};
