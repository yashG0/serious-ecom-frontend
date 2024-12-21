import {useEffect, useState} from "react";
import {getCartItems, removeItemFromCart, updateItemInCart} from "../api/cart_handler.js";
import {addCartItemsToOrder} from "../api/order_handler.js";

// Function to add cart items to order

export const Cart = () => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		getCartItems()
			.then((res) => setCartItems(res))
			.catch((err) => console.error(err));
	}, []);

	const handleRemoveItem = (itemId) => {
		removeItemFromCart(itemId)
			.then(() => setCartItems((prev) => prev.filter((item) => item.id !== itemId)))
			.catch((err) => console.error(err));
	};

	const handleQuantityChange = (itemId, newQuantity) => {
		if (newQuantity > 0) {
			updateItemInCart(itemId, newQuantity)
				.then(() => {
					setCartItems((prev) =>
						prev.map((item) =>
							item.id === itemId ? {...item, quantity: newQuantity} : item
						)
					);
				})
				.catch((err) => console.error(err));
		} else {
			console.error("Quantity must be greater than 0");
		}
	};

	// Button to add items to order
	const handleAddToOrder = () => {
		if (cartItems.length === 0) {
			alert("Your cart is empty!");
		} else {
			addCartItemsToOrder(cartItems);
		}
	};

	return (
		<div className="h-screen mt-[10vh] bg-gradient-to-r from-cyan-50 to-cyan-100 py-10">
			{/* Page Title */}
			<h1 className="text-center p-2 md:p-0 md:text-6xl text-4xl font-extrabold mb-12 tracking-widest">
				Your Cart
			</h1>

			{/* Cart Item Container */}
			<div className="w-[90vw] mx-auto grid gap-8 lg:grid-cols-3">
				{cartItems.length > 0 ? (
					cartItems.map((item) => (
						<div
							key={item.id}
							className="relative bg-white rounded-xl shadow-lg p-5 transition-transform hover:scale-105"
						>
							{/* Product Details */}
							<img
								src={`https://via.placeholder.com/100?text=Product`}
								alt="Product"
								className="w-24 h-24 object-cover rounded-md shadow-sm border-2 border-cyan-500 mx-auto"
							/>
							<div className="text-center mt-4">
								<h3 className="text-lg font-semibold text-gray-800">Product Name</h3>
								<p className="text-gray-500">Product ID: {item.product_id}</p>
								{/* Quantity Controls */}
								<div className="flex items-center justify-center space-x-4 mt-2">
									<button
										onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
										className="bg-gray-200 text-gray-600 px-2 py-1 rounded hover:bg-gray-300"
									>
										-
									</button>
									<span className="text-gray-800 font-medium">{item.quantity}</span>
									<button
										onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
										className="bg-gray-200 text-gray-600 px-2 py-1 rounded hover:bg-gray-300"
									>
										+
									</button>
								</div>
							</div>
							<button
								onClick={() => handleRemoveItem(item.id)}
								className="mt-4 w-full bg-cyan-500 text-white py-2 rounded-md shadow-md hover:bg-cyan-600 transition"
							>
								Remove
							</button>
						</div>
					))
				) : (
					<div className="relative font-semibold text-center text-cyan-600 md:text-2xl text-lg">
						Your cart is empty! Add items to get started.
					</div>
				)}
			</div>

			{/* Add to Order Button */}
			{cartItems.length > 0 && (
				<div className="text-center mt-8">
					<button
						onClick={handleAddToOrder}
						className="w-full bg-cyan-700 text-white py-3 rounded-md text-lg font-medium hover:bg-cyan-800 transition"
					>
						Add to Order
					</button>
				</div>
			)}
		</div>
	);
};
