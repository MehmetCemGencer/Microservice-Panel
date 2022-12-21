import cors from "cors"
import express from "express"
import session from "./src/security/session.js"
import { routes } from "./src/routes/index.js"
import { errorHandler } from "./src/middleware/errorHandler.js"
import { startServer } from "./src/startServer.js"
import { createChannel } from "./src/utils/index.js"

const app = express()

// Middlewares
app.use(express.json({ extended: false }))
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
)
session(app)

export const channel = await createChannel()

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
