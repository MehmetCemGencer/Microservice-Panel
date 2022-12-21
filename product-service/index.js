import express from "express"
import { routes } from "./src/routes/index.js"
import { errorHandler } from "./src/middleware/errorHandler.js"
import { startServer } from "./src/startServer.js"

const app = express()

// Middlewares
app.use(express.json({ extended: false }))
app.use("/products", express.static("uploads"))

// Routes
routes(app)
app.use(errorHandler)

//
;(async () => {
	try {
		await startServer(app)
	} catch (e) {
		console.log(e)
	}
})()
