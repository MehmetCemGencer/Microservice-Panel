import waitPort from "wait-port"
import { DB_PORT, DB_URL } from "./config/index.js"
import { sequelize } from "./database/db.js"
import { createTables } from "./database/models/index.js"

export async function startServer(app) {
	const isPostgresAvailable = await waitPort({
		port: DB_PORT,
		host: DB_URL,
	})

	if (isPostgresAvailable) {
		await sequelize.authenticate()
		console.log("Postgresql connected")

		await createTables()

		app.listen(8000, () => {
			console.log("Product-service listening on port:8000")
		})
	}
}
