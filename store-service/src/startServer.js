import waitPort from "wait-port"
import { sequelize } from "./database/db.js"
import { listenToMessages } from "./messageQueue.js"
import { createTables } from "./database/models/index.js"
import { DB_PORT, DB_URL } from "./config/index.js"

export async function startServer(app) {
	const isPostgresAvailable = await waitPort({
		port: DB_PORT,
		host: DB_URL,
	})

	if (isPostgresAvailable) {
		await sequelize.authenticate()
		console.log("Postgresql connected")

		await createTables()
		await listenToMessages()

		app.listen(8000, () => {
			console.log("Store-service listening on port:8000")
		})
	}
}
