import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { showNotification } from "@mantine/notifications"

const url = "http://localhost:8000"
const postConfig = {
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
}
const getConfig = { withCredentials: true }

export const login = createAsyncThunk(
	"auth/login",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const res = await axios.post(
				`${url}`,
				JSON.stringify({ email, password }),
				postConfig
			)

			showNotification({
				title: `Welcome ${res.data.data.user.username}`,
				color: "green",
			})

			return res.data.data.user
		} catch (e) {
			if (!e.response) {
				showNotification({
					title: e.message,
					color: "red",
				})
				return rejectWithValue(e.message)
			}

			if (e.response.data.errors) {
				e.response.data.errors.map((error) => {
					showNotification({
						title: error[Object.keys(error)[0]],
						color: "red",
					})
				})
				return rejectWithValue(e.response.data.errors)
			}

			if (e.response.data.message) {
				showNotification({
					title: e.response.data.message,
					color: "red",
				})
				return rejectWithValue(e.response.data.message)
			}
		}
	}
)

export const register = createAsyncThunk(
	"auth/register",
	async (
		{ username, email, password, confirmPassword },
		{ rejectWithValue }
	) => {
		try {
			const res = await axios.post(
				`${url}/register`,
				JSON.stringify({ username, email, password, confirmPassword }),
				postConfig
			)

			return res.data.data.user
		} catch (e) {
			if (e.response.data.errors) {
				e.response.data.errors.map((error) => {
					showNotification({
						title: error[Object.keys(error)[0]],
						color: "red",
					})
				})
				return rejectWithValue(e.response.data.errors)
			}

			if (e.response.data) {
				showNotification({
					title: e.response.data.message,
					color: "red",
				})
				return rejectWithValue(e.response.data.message)
			}

			showNotification({
				title: e.message,
				color: "red",
			})
			return rejectWithValue(e.message)
		}
	}
)

export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get(`${url}/logout`, getConfig)

			return res.data.message
		} catch (e) {
			if (e.response.data) {
				showNotification({
					title: e.response.data.message,
					color: "red",
				})
				return rejectWithValue(e.response.data.message)
			}

			showNotification({
				title: e.message,
				color: "red",
			})
			return rejectWithValue(e.message)
		}
	}
)

export const authenticate = createAsyncThunk(
	"auth/authenticate",
	async (cancelToken, { rejectWithValue }) => {
		try {
			const res = await axios.get(`${url}`, {
				withCredentials: true,
				cancelToken,
			})

			showNotification({
				title: `Welcome back, ${res.data.data.user.username}`,
				color: "green",
			})

			return res.data.data.user
		} catch (e) {
			if (!axios.isCancel(e)) {
				if (e.response) {
					showNotification({
						title: e.response.data.message,
						color: "red",
					})
					return rejectWithValue(e.response.data.message)
				}
				showNotification({
					title: e.message,
					color: "red",
				})
				return rejectWithValue(e.message)
			}
			return rejectWithValue()
		}
	}
)

export const deleteAccount = createAsyncThunk(
	"auth/deleteAccount",
	async (password, { rejectWithValue }) => {
		try {
			const res = await axios.post(
				`${url}/delete`,
				JSON.stringify({ password }),
				postConfig
			)

			return
		} catch (e) {
			if (e.response) {
				showNotification({
					title: e.response.data.message,
					color: "red",
				})
				return rejectWithValue(e.response.data.message)
			}
			showNotification({
				title: e.message,
				color: "red",
			})
			return rejectWithValue(e.message)
		}
	}
)

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		isAuthenticated: false,
		isLoading: true,
	},
	extraReducers: {
		[login.fulfilled]: (state, action) => {
			return {
				user: action.payload,
				isLoading: false,
				isAuthenticated: true,
			}
		},
		[login.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
				isAuthenticated: false,
			}
		},
		[login.rejected]: (state, action) => {
			return {
				user: null,
				isLoading: false,
				isAuthenticated: false,
			}
		},
		[register.fulfilled]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
		[register.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
				isAuthenticated: false,
			}
		},
		[register.rejected]: (state, action) => {
			return {
				user: null,
				isLoading: false,
				isAuthenticated: false,
			}
		},
		[authenticate.fulfilled]: (state, action) => {
			return {
				...state,
				user: action.payload,
				isLoading: false,
				isAuthenticated: true,
			}
		},
		[authenticate.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
				isAuthenticated: false,
			}
		},
		[authenticate.rejected]: (state, action) => {
			return {
				...state,
				user: null,
				isLoading: false,
				isAuthenticated: false,
			}
		},
		[logout.fulfilled]: (state, action) => {
			return {
				...state,
				user: null,
				isLoading: false,
				isAuthenticated: false,
			}
		},
		[logout.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[logout.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
		[deleteAccount.fulfilled]: (state, action) => {
			return {
				...state,
				user: null,
				isLoading: false,
				isAuthenticated: false,
			}
		},
		[deleteAccount.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[deleteAccount.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
	},
})

export default authSlice.reducer
