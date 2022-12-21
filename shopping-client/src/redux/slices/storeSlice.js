import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { showNotification } from "@mantine/notifications"

const getConfig = { withCredentials: true }
const postConfig = {
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
}
const url = "http://localhost:8000/store"

export const getStore = createAsyncThunk(
	"store/getStore",
	async (cancelToken, { rejectWithValue }) => {
		try {
			const res = await axios.get(`${url}`, {
				withCredentials: true,
				cancelToken,
			})

			return res.data.data
		} catch (e) {
			if (!axios.isCancel(e)) {
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
			return rejectWithValue()
		}
	}
)

export const updateStoreName = createAsyncThunk(
	"store/updateStoreName",
	async ({ id, name }, { rejectWithValue }) => {
		try {
			const res = await axios.put(`${url}/${id}`, { name }, postConfig)

			showNotification({
				title: "Store name succesfully updated",
				color: "green",
			})

			return res.data.data
		} catch (e) {
			if (!axios.isCancel(e)) {
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
			return rejectWithValue()
		}
	}
)

export const uploadStoreLogo = createAsyncThunk(
	"store/uploadStoreLogo",
	async (file, { getState, rejectWithValue }) => {
		try {
			const data = new FormData()
			data.append("img", file)

			const res = await axios.post(
				`http://localhost:8000/store/logo`,
				data,
				{
					withCredentials: true,
				}
			)

			showNotification({
				title: "Store logo succesfully updated",
				color: "green",
			})

			return res.data.data
		} catch (e) {
			if (!axios.isCancel(e)) {
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
			return rejectWithValue()
		}
	}
)

export const deleteStoreLogo = createAsyncThunk(
	"store/deleteStoreLogo",
	async (_, { getState, rejectWithValue }) => {
		try {
			const {
				store: { id },
			} = getState()

			const res = await axios.delete(
				`http://localhost:8000/store/logo/${id}`,
				getConfig
			)

			showNotification({
				title: "Store logo deleted",
				color: "green",
			})

			return res.data.data
		} catch (e) {
			if (!axios.isCancel(e)) {
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
			return rejectWithValue()
		}
	}
)

export const storeSlice = createSlice({
	name: "store",
	initialState: {
		id: null,
		name: null,
		logo: null,
		isLoading: true,
	},
	extraReducers: {
		[getStore.fulfilled]: (state, action) => {
			return {
				...state,
				isLoading: false,
				id: action.payload.id,
				name: action.payload.name,
				logo: action.payload.logo,
			}
		},
		[getStore.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[getStore.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
		[updateStoreName.fulfilled]: (state, action) => {
			return {
				...state,
				isLoading: false,
				id: action.payload.id,
				name: action.payload.name,
				logo: action.payload.logo,
			}
		},
		[updateStoreName.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[updateStoreName.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
		[uploadStoreLogo.fulfilled]: (state, action) => {
			return {
				...state,
				isLoading: false,
				id: action.payload.id,
				name: action.payload.name,
				logo: action.payload.logo,
			}
		},
		[uploadStoreLogo.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[uploadStoreLogo.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
		[deleteStoreLogo.fulfilled]: (state, action) => {
			return {
				...state,
				isLoading: false,
				id: action.payload.id,
				name: action.payload.name,
				logo: action.payload.logo,
			}
		},
		[deleteStoreLogo.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[deleteStoreLogo.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
	},
})

export default storeSlice.reducer
