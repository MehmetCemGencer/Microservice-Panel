import { ProductModel } from "./Product.js"

export async function createTables() {
	try {
		await ProductModel.sync({ alter: true })
	} catch (e) {
		throw Error(e.message)
	}
}

export { ProductModel as Product }
