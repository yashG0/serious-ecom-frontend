import {login} from "../api/auth_handler.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeStatus} from "../redux/store/authSlice.jsx";


export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Reset error state
		setError(null);

		try {
			const credentials = {username: email, password};
			const response = await login(credentials);
			console.log("Login successful:", response);
			// Redirect or perform any other action on successful login
			dispatch(changeStatus(true));
			navigate("/");
		} catch (e) {
			setError(e.message); // Show error message if login fails
		}
	};
	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-50 to-cyan-200">
			<div className="bg-white shadow-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
				<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
				<p className="text-sm text-gray-600 text-center mb-6">
					Sign in to your account to continue
				</p>

				{/* Display error message if login fails */}
				{error && (
					<div className="bg-red-100 text-red-800 p-2 rounded mb-4 text-center">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-700"
							placeholder="Enter your email"
							required
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-700"
							placeholder="Enter your password"
							required
						/>
					</div>
					<div className="flex items-center justify-between">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-cyan-700"
							/>
							<span className="ml-2 text-sm text-gray-600">Remember me</span>
						</label>
						<a href="#" className="text-sm text-blue-600 hover:underline">
							Forgot password?
						</a>
					</div>
					<button
						type="submit"
						className="w-full bg-cyan-700 text-white font-medium py-2 rounded-md hover:bg-cyan-800 transition duration-200"
					>
						Sign In
					</button>
				</form>

				<p className="text-sm text-gray-600 text-center mt-6">
					Don’t have an account?{" "}
					<a href="#" className="text-cyan-700 font-medium hover:underline">
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
};
