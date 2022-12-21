import { validationResult } from "express-validator"

export const validationErrorCheck = function (req, res, next) {
	const errors = validationResult(req)

	if (errors.isEmpty()) return next()

	return res.status(400).json({
		errors: errors.errors.map((e) => {
			return { [e.param]: e.msg }
		}),
	})
}
