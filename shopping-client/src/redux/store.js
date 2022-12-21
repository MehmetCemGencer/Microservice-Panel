import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import storeReducer from "./slices/storeSlice"
import productReducer from "./slices/productSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		store: storeReducer,
		product: productReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		})
	},
})
