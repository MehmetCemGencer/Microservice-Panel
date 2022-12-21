import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function PrivateRoute({ Children }) {
	const { isAuthenticated } = useSelector((state) => state.auth)

	return isAuthenticated ? <Children /> : <Navigate to="/" />
}
