export const privateRoute = function (req, res, next) {
	if (req.isAuthenticated()) {
		req.uid = req.user.id
		return next()
	}

	return res.status(401).json({ message: "Not authenticated" })
}
