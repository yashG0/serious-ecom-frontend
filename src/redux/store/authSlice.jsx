import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		value: Boolean(localStorage.getItem('token')),  // Check if token exists in localStorage on app load
	},
	reducers: {
		changeStatus: (state, action) => {
			state.value = action.payload
		},
		setUserLoggedIn: (state) => {
			state.value = true;
		},
		setUserLoggedOut: (state) => {
			state.value = false;
		},
	},
})

// Action creators are generated for each case reducer function
export const { changeStatus, setUserLoggedIn, setUserLoggedOut } = authSlice.actions

export default authSlice.reducer
