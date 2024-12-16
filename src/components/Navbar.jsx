import {useState} from "react";

const Navbar = () => {

	const navLinks = [
		{
			name: "Home",
			link: "/"
		}, {
			name: "Shop",
			link: "/shop"
		}, {
			name: "Categories",
			link: "/categories"
		}, {
			name: "Order",
			link: "/order"
		}
	];

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<div className={"h-[8vh] w-full text-black bg-violet-100"}>
				<div className={"flex justify-between items-center w-[80vw] mx-auto h-full"}>
					{/*  E-commerce ICON  */}
					<span className={"text-3xl font-bold"}>EcoMart</span>

					{/* Nav-links */}
					<ul className="flex space-x-4 justify-center items-center uppercase">
						{navLinks.map((data, index) => (
							<li key={index}>
								<a href={data.link} className="hover:underline">
									{data.name}
								</a>
							</li>
						))}
					</ul>

					{/*  Account-Info  */}
					<div className="space-x-4 flex items-center">
						{isLoggedIn ? (
							<>
								<button
									className="border-black text-black border font-medium px-4 py-2 rounded">
									Account Info
								</button>
								<button
									className="border-black text-black border font-medium px-4 py-2 rounded">
									Logout
								</button>
							</>
						) : (
							<>
								<button
									className="border-black text-black border font-medium px-4 py-2 rounded hover:bg-black hover:text-white">
									Login
								</button>
								<button
									className="border-black text-black border font-medium px-4 py-2 rounded hover:bg-black hover:text-white">
									Sign Up
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar;