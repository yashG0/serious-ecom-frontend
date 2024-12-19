import {useState} from "react";

export const Cart = () => {
	const [cartItems, setCartItems] = useState([
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

	// Function to calculate the total price
	const calculateTotal = () =>
		cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

	// Function to remove an item from the cart
	const removeItem = (id) => {
		setCartItems(cartItems.filter((item) => item.id !== id));
	};

	return (
		<div className="min-h-screen mt-[10vh] bg-gray-100 py-10">
			<h1 className="text-center md:text-6xl text-4xl font-bold mb-8 tracking-widest">Your Cart</h1>

			{cartItems.length === 0 ? (
				<p className="text-center text-gray-600 text-lg ">
					Your cart is empty. Add items to get started!
				</p>
			) : (
				<div className="w-[90vw] mx-auto grid gap-6 lg:grid-cols-2">
					{/* Cart Items */}
					<div className="space-y-6">
						{cartItems.map((item) => (
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
										<h2 className="text-lg font-bold">{item.name}</h2>
										<p className="text-gray-600">
											${item.price.toFixed(2)} x {item.quantity}
										</p>
										<p className="text-gray-800 font-medium">
											${(item.price * item.quantity).toFixed(2)}
										</p>
									</div>
								</div>
								<button
									onClick={() => removeItem(item.id)}
									className="text-cyan-500 hover:text-cyan-700 font-medium"
								>
									Remove
								</button>
							</div>
						))}
					</div>

					{/* Summary Section */}
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
							Proceed to Checkout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
