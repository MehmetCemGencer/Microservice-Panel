export function errorHandler(err, req, res, next) {
	res.status(500).json({ message: "Server Error" })
}
