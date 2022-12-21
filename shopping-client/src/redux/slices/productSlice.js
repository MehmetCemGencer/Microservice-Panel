import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { showNotification } from "@mantine/notifications"

const getConfig = { withCredentials: true }
const postConfig = {
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
}
const url = "http://localhost:8000/product"

export const createProduct = createAsyncThunk(
	"product/createProduct",
	async ({ name, quantity, files }, { getState, rejectWithValue }) => {
		try {
			const {
				store: { id },
			} = getState()

			const data = new FormData()
			data.append("name", name)
			data.append("quantity", quantity)
			data.append("storeId", id)

			files?.map((file) => {
				data.append("files", file)
			})

			const res = await axios.post(`${url}`, data, getConfig)

			showNotification({
				title: res.data.message,
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

export const getAllProducts = createAsyncThunk(
	"product/getAllProducts",
	async (cancelToken, { getState, rejectWithValue }) => {
		try {
			const {
				store: { id },
			} = getState()

			const res = await axios.get(`${url}/all?storeId=${id}`, {
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

export const deleteProduct = createAsyncThunk(
	"product/deleteProduct",
	async (id, { getState, rejectWithValue }) => {
		try {
			const {
				store: { id: storeId },
			} = getState()

			const res = await axios.delete(`${url}/${id}?storeId=${storeId}`, {
				withCredentials: true,
			})

			showNotification({
				message: "Product deleted",
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

export const getProductById = createAsyncThunk(
	"product/getProductById",
	async ({ id, cancelToken }, { getState, rejectWithValue }) => {
		try {
			const {
				store: { id: storeId },
			} = getState()

			const res = await axios.get(`${url}/?id=${id}&storeId=${storeId}`, {
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

export const deleteProductPicture = createAsyncThunk(
	"product/deleteProductPicture",
	async ({ id, picture }, { getState, rejectWithValue }) => {
		try {
			const {
				store: { id: storeID },
			} = getState()

			const res = await axios.delete(
				`${url}/pictures/${id}?storeId=${storeID}&picture=${picture}`,
				{
					withCredentials: true,
				}
			)

			showNotification({
				message: res.data.message,
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

export const updateProductNameQuantity = createAsyncThunk(
	"product/updateProductNameQuantity",
	async ({ id, name, quantity }, { getState, rejectWithValue }) => {
		try {
			const {
				store: { id: storeId },
			} = getState()

			const res = await axios.put(
				`${url}/${id}?storeId=${storeId}`,
				JSON.stringify({ name, quantity }),
				postConfig
			)

			showNotification({
				message: res.data.message,
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

export const updateProductPictures = createAsyncThunk(
	"product/updateProductPictures",
	async ({ id, pictures }, { getState, rejectWithValue }) => {
		try {
			const {
				store: { id: storeId },
			} = getState()

			const data = new FormData()
			pictures?.map((file) => {
				data.append("pictures", file)
			})

			const res = await axios.put(
				`${url}/pictures/${id}?storeId=${storeId}`,
				data,
				getConfig
			)

			showNotification({
				message: res.data.message,
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

export const productSlice = createSlice({
	name: "product",
	initialState: {
		isLoading: true,
		products: null,
		product: null,
	},
	extraReducers: {
		[createProduct.fulfilled]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
		[createProduct.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[createProduct.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
		[getAllProducts.fulfilled]: (state, action) => {
			return {
				isLoading: false,
				products: action.payload,
			}
		},
		[getAllProducts.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[getAllProducts.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
		[getProductById.fulfilled]: (state, action) => {
			return {
				...state,
				isLoading: false,
				product: action.payload,
			}
		},
		[getProductById.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[getProductById.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
		[deleteProductPicture.fulfilled]: (state, action) => {
			return {
				...state,
				isLoading: false,
				product: action.payload,
			}
		},
		[deleteProductPicture.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[deleteProductPicture.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
		[updateProductNameQuantity.fulfilled]: (state, action) => {
			return {
				...state,
				isLoading: false,
				product: action.payload,
			}
		},
		[updateProductNameQuantity.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[updateProductNameQuantity.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
		[updateProductPictures.fulfilled]: (state, action) => {
			return {
				...state,
				isLoading: false,
				product: action.payload,
			}
		},
		[updateProductPictures.pending]: (state, action) => {
			return {
				...state,
				isLoading: true,
			}
		},
		[updateProductPictures.rejected]: (state, action) => {
			return {
				...state,
				isLoading: false,
			}
		},
	},
})

export default productSlice.reducer
