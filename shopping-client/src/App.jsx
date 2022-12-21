import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
// UI
import { MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
// Navigation
import { BrowserRouter, Route, Routes } from "react-router-dom"
// Reducer
import { authenticate } from "./redux/slices/authSlice"
// Pages
import Login from "./pages/Login"
import Register from "./pages/Register"
import Store from "./pages/Store"
import Products from "./pages/Products"
import ProductsCreate from "./pages/Products/Create"
import ProductsUpdate from "./pages/Products/Update"
// Components
import Layout from "./components/Layout"
import PrivateRoute from "./components/PrivateRoute"
import PublicRoute from "./components/PublicRoute"

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		const cancelToken = axios.CancelToken.source()

		;(async () => {
			await dispatch(authenticate(cancelToken.token))
		})()

		return () => {
			cancelToken.cancel()
		}
	}, [])

	return (
		<>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ colorScheme: "dark" }}
			>
				<NotificationsProvider>
					<BrowserRouter>
						<Routes>
							<Route element={<Layout />}>
								<Route
									path="/"
									element={<PublicRoute Children={Login} />}
								/>
								<Route
									path="/register"
									element={
										<PublicRoute Children={Register} />
									}
								/>
								<Route
									path="/store"
									element={<PrivateRoute Children={Store} />}
								/>
								<Route
									path="/products"
									element={
										<PrivateRoute Children={Products} />
									}
								/>
								<Route
									path="/products/create"
									element={
										<PrivateRoute
											Children={ProductsCreate}
										/>
									}
								/>
								<Route
									path="/products/update/:id"
									element={
										<PrivateRoute
											Children={ProductsUpdate}
										/>
									}
								/>
							</Route>
						</Routes>
					</BrowserRouter>
				</NotificationsProvider>
			</MantineProvider>
		</>
	)
}

export default App
