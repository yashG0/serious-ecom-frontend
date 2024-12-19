import { useState } from "react";

export const Order = () => {
	const [orderItems] = useState([
		{
			id: 1,
			name: "Wireless Headphones",
			price: 49.99,
			quantity: 1,
			image: "https://via.placeholder.com/300",
		},
		{
			id: 2,
			name: "Smart Watch",
			price: 99.99,
			quantity: 2,
			image: "https://via.placeholder.com/300",
		},
	]);

	// Calculate Total Price
	const calculateTotal = () =>
		orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

	return (
		<div className="min-h-screen mt-[10vh] bg-gradient-to-r from-blue-50 to-blue-100 py-10">
			<h1 className="text-center md:text-6xl text-4xl font-bold mb-8 tracking-widest">
				Order Confirmation
			</h1>

			<div className="w-[90vw] mx-auto grid gap-8 lg:grid-cols-3">
				{/* Order Items Section */}
				<div className="lg:col-span-2 space-y-6">
					{orderItems.map((item) => (
						<div
							key={item.id}
							className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
						>
							<div className="flex items-center">
								<img
									src={item.image}
									alt={item.name}
									className="w-20 h-20 rounded-lg object-cover"
								/>
								<div className="ml-4">
									<h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
									<p className="text-gray-600">
										${item.price.toFixed(2)} x {item.quantity}
									</p>
									<p className="text-gray-800 font-medium">
										${(item.price * item.quantity).toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Order Summary Section */}
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
					<button className="mt-6 w-full bg-cyan-700 text-white py-3 rounded-md text-lg font-medium hover:bg-cyan-800 transition">
						Confirm Order
					</button>
				</div>
			</div>
		</div>
	);
};
