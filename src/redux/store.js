import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "./store/counterSlice.jsx";
import authSlice from "./store/authSlice.jsx";


export const store = configureStore({
	reducer: {counter: counterSlice, auth: authSlice},
})