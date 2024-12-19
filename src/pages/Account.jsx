import {useState, useEffect} from "react";
import {fetchUserInfo, changePassword} from "../api/user_handler.js"; // Ensure changePassword is imported

export const Account = () => {
	const [userInfo, setUserInfo] = useState(null);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		// Fetch user information on mount and handle errors
		const getUserInfo = async () => {
			try {
				const data = await fetchUserInfo(); // Ensure this function returns the user data
				setUserInfo(data); // Update the userInfo state with the fetched data
			} catch (e) {
				setError(`Failed to load user information ${e}`);
			}
		};

		getUserInfo();
	}, []); // Empty dependency array to run only once on mount

	const handlePasswordChange = async (e) => {
		e.preventDefault();

		// Validate password match
		if (newPassword !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		try {
			// Call the changePassword function to update the password
			const result = await changePassword(currentPassword, newPassword);
			if (result) {
				setSuccessMessage("Password changed successfully!");
				setCurrentPassword("");
				setNewPassword("");
				setConfirmPassword("");
			}
		} catch (e) {
			setError(`Failed to change password. Please try again ${e}.`);
		}
	};

	if (error) {
		return <div>Error: {error}</div>; // Show error message if there is an error fetching user info
	}

	if (!userInfo) {
		return <div>Loading...</div>; // Show loading if user info is still being fetched
	}

	return (
		<div className="min-h-screen mt-[10vh] bg-gradient-to-r from-gray-50 to-gray-100 py-10">
			<h1 className="text-center text-4xl font-bold mb-8 tracking-wide">My Account</h1>

			<div className="w-[90vw] mx-auto grid gap-8 lg:grid-cols-2">
				{/* User Information Section */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-6">Your Information</h2>
					<div className="space-y-4">
						<p>
							<span className="font-medium text-gray-600">Name: </span>
							{userInfo.username}
						</p>
						<p>
							<span className="font-medium text-gray-600">Email: </span>
							{userInfo.email}
						</p>
						<p>
							<span className="font-medium text-gray-600">Joined: </span>
							{new Date(userInfo["created_at"]).toLocaleDateString('en-GB')}
						</p>
						<p>
							<span className="font-medium text-gray-600">Last updated: </span>
							{new Date(userInfo["updated_at"]).toLocaleDateString('en-GB')}
						</p>
					</div>
				</div>

				{/* Password Change Section */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-6">Change Password</h2>
					{successMessage && (
						<div className="text-green-600 mb-4">{successMessage}</div>
					)}
					<form onSubmit={handlePasswordChange} className="space-y-4">
						<div>
							<label htmlFor="currentPassword" className="block text-gray-600 font-medium mb-2">
								Current Password
							</label>
							<input
								type="password"
								id="currentPassword"
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor="newPassword" className="block text-gray-600 font-medium mb-2">
								New Password
							</label>
							<input
								type="password"
								id="newPassword"
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor="confirmPassword" className="block text-gray-600 font-medium mb-2">
								Confirm Password
							</label>
							<input
								type="password"
								id="confirmPassword"
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-medium hover:bg-blue-700 transition"
						>
							Update Password
						</button>
					</form>
					{error && <div className="text-red-600 mt-4">{error}</div>}
				</div>
			</div>
		</div>
	);
};
