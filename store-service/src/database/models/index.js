import { StoreModel } from "./Store.js"

export async function createTables() {
	try {
		await StoreModel.sync({ alter: true })
	} catch (e) {
		throw Error(e.message)
	}
}

export { StoreModel as Store }
