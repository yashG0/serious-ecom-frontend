import {useEffect, useState} from "react";
import {fetchAllOrders, removeOrder} from "../api/order_handler.js";

export const Order = () => {
	const [orderItems, setOrderItems] = useState([]);

	useEffect(() => {
		fetchAllOrders()
			.then((res) => setOrderItems(res))
			.catch((err) => console.error(err));
	}, []);

	// Calculate the total price only for orders with status 'pending'
	const calculateTotal = () =>
		orderItems
			.filter((item) => item.status === "pending") // Filter out delivered orders
			.reduce((total, item) => total + item.total_price, 0); // Sum the total price

	// Function to handle removing an order
	const handleRemoveOrder = async (orderId) => {
		try {
			// Optimistic update: remove the item from the UI immediately
			setOrderItems(orderItems.filter((item) => item.id !== orderId));

			// Remove the order from the backend
			await removeOrder(orderId);
		} catch (error) {
			console.error("Error removing order:", error);

			// If there's an error, you might want to restore the item (optional)
			// You can add the item back to the state if needed
			// setOrderItems([...orderItems, removedItem]);
		}
	};

	return (
		<div className="min-h-screen mt-[10vh] from-cyan-50 to-cyan-200 bg-gradient-to-r py-10">
			<h1 className="text-center md:text-6xl text-4xl font-extrabold mb-8 tracking-widest">
				Order Confirmation
			</h1>

			<div className="w-[90vw] mx-auto grid gap-8 lg:grid-cols-3">
				{/* Order Items Section (Pending Orders) */}
				<div className="lg:col-span-2 space-y-6">
					<h2 className="text-xl font-bold mb-6">Pending Orders</h2>
					{orderItems
						.filter((item) => item.status === "pending") // Only show pending orders
						.map((item) => (
							<div
								key={item.id}
								className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
							>
								<div className="flex items-center">
									{/* Placeholder for the image */}
									<img
										src="https://via.placeholder.com/300"
										alt={item.id}
										className="w-20 h-20 rounded-lg object-cover"
									/>
									<div className="ml-4">
										<h2 className="text-lg font-bold text-gray-800">{item.id}</h2>
										<p className="text-gray-600">${item.total_price.toFixed(2)} x 1</p>
										<p className="text-gray-800 font-medium">${item.total_price.toFixed(2)}</p>
									</div>
								</div>

								{/* Remove Button for Pending Orders Only */}
								<button
									onClick={() => handleRemoveOrder(item.id)}
									className="text-red-600 font-semibold mt-4"
								>
									Remove
								</button>
							</div>
						))}
				</div>

				{/* Order Summary Section (Pending Orders Only) */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-bold mb-6">Order Summary</h2>
					<div className="flex justify-between mb-4">
						<span className="text-gray-600">Subtotal</span>
						<span className="font-medium">${calculateTotal().toFixed(2)}</span>
					</div>
					<div className="flex justify-between mb-4">
						<span className="text-gray-600">Shipping</span>
						<span className="font-medium">Free</span>
					</div>
					<div className="flex justify-between text-lg font-bold">
						<span>Total</span>
						<span>${calculateTotal().toFixed(2)}</span>
					</div>
					<button
						className="mt-6 w-full bg-cyan-700 text-white py-3 rounded-md text-lg font-medium hover:bg-cyan-800 transition">
						Confirm Order
					</button>
				</div>
			</div>

			{/* Order History Section (Non-pending Orders) */}
			<div className="w-[90vw] mx-auto grid gap-8 lg:grid-cols-3 mt-10">
				<h2 className="text-xl font-bold mb-6">Order History</h2>
				{orderItems
					.filter((item) => item.status !== "pending") // Show non-pending orders
					.map((item) => (
						<div
							key={item.id}
							className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
						>
							<div className="flex items-center">
								{/* Placeholder for the image */}
								<img
									src="https://via.placeholder.com/300"
									alt={item.id}
									className="w-20 h-20 rounded-lg object-cover"
								/>
								<div className="ml-4">
									<h2 className="text-lg font-bold text-gray-800">{item.id}</h2>
									<p className="text-gray-600">${item.total_price.toFixed(2)} x 1</p>
									<p className="text-gray-800 font-medium">
										{item.status === "delivered" ? "Delivered" : "Other Status"}
									</p>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
