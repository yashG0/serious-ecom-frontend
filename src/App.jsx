import './App.css'
import {Home} from "./pages/Home.jsx";
import {Product} from "./pages/Product.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Categories} from "./pages/Categories.jsx";
import {Cart} from "./pages/Cart.jsx";
import {Layout} from "./pages/Layout.jsx";
import {Login} from "./pages/Login.jsx";
import {Signup} from "./pages/Signup.jsx";
import {ProductByCategory} from "./pages/ProductByCategory.jsx";
import {Order} from "./pages/Order.jsx";
import {Account} from "./pages/Account.jsx";
import {Logout} from "./pages/Logout.jsx";


const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout/>,
		children: [
			{path: "/", element: <Home/>},
			{path: "/product", element: <Product/>},
			{path: "/categories", element: <Categories/>},
			{path: "/cart", element: <Cart/>},
			{path: "/login", element: <Login/>},
			{path: "/signup", element: <Signup/>},
			{path: "/order", element: <Order/>},
			{path: "/account", element: <Account/>},
			{path: "/logout", element: <Logout/>},
			{path: "/product/byCategory/:categoryName", element: <ProductByCategory/>},
		]
	},
]);

function App() {
	return (
		<main>
			<RouterProvider router={router}/>
		</main>
	)
}

export default App
