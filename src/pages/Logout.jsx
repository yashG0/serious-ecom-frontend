import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeStatus} from "../redux/store/authSlice.jsx";

export const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		// Clear the token from localStorage
		localStorage.removeItem("token");

		// Optionally, clear other user-related data
		// localStorage.removeItem("user");

		dispatch(changeStatus(false));
		// Redirect to the login page
		navigate("/login");
	}, [navigate]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<h1 className="text-3xl font-bold text-gray-800 mb-4">Logging Out...</h1>
				<p className="text-gray-600">You will be redirected shortly.</p>
			</div>
		</div>
	);
};
