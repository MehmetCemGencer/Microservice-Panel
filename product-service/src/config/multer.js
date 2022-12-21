import multer from "multer"

const storage = multer.diskStorage({
	destination: "./uploads",
	filename: function (req, file, cb) {
		cb(
			null,
			Date.now().toString(36) +
				Math.random().toString(36).substring(5) +
				"." +
				file.mimetype.replace("image/", "")
		)
	},
})

function fileFilter(req, file, cb) {
	if (
		file.mimetype != "image/png" &&
		file.mimetype != "image/jpg" &&
		file.mimetype != "image/jpeg"
	) {
		return cb("File type must be one of png, jpg or jpeg", false)
	}
	return cb(null, true)
}

export const upload = multer({
	storage,
	fileFilter,
})
