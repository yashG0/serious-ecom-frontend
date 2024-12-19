import { useState } from "react";
import {signup} from "../api/auth_handler.js";

export const Signup = () => {
	const [userDetails, setUserDetails] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	// Handle form field changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserDetails({
			...userDetails,
			[name]: value,
		});
	};

	// Handle form submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (userDetails.password !== userDetails.confirmPassword) {
			setErrorMessage("Passwords do not match!");
			return;
		}

		try {
			const message = await signup(userDetails); // Call your signup function
			setSuccessMessage(message); // On success, show success message
			setErrorMessage(""); // Clear any previous error
		} catch (error) {
			setErrorMessage(error.message); // Display error message
			setSuccessMessage(""); // Clear any previous success message
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-50 to-cyan-200">
			<div className="bg-white p-8 rounded-lg shadow-gray-800 shadow-md w-full max-w-md">
				<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
					Create Your Account
				</h1>
				<p className="text-sm text-gray-600 text-center mb-6">
					Sign up to start your journey!
				</p>

				{/* Show error or success message */}
				{errorMessage && (
					<div className="bg-red-100 text-red-800 p-2 rounded-md mb-4">
						{errorMessage}
					</div>
				)}
				{successMessage && (
					<div className="bg-green-100 text-green-800 p-2 rounded-md mb-4">
						{successMessage}
					</div>
				)}

				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							value={userDetails.username}
							onChange={handleChange}
							className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600"
							placeholder="Enter your username"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={userDetails.email}
							onChange={handleChange}
							className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600"
							placeholder="Enter your email"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={userDetails.password}
							onChange={handleChange}
							className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600"
							placeholder="Enter your password"
						/>
					</div>
					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={userDetails.confirmPassword}
							onChange={handleChange}
							className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600"
							placeholder="Confirm your password"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-cyan-600 text-white font-medium py-2 rounded-md hover:bg-cyan-700 transition duration-200"
					>
						Sign Up
					</button>
				</form>

				<p className="text-sm text-gray-600 text-center mt-6">
					Already have an account?{" "}
					<a
						href="/login" // Make sure this is the correct link to your login page
						className="text-cyan-600 font-medium hover:underline"
					>
						Log In
					</a>
				</p>
			</div>
		</div>
	);
};
