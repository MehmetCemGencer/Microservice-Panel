import { unlink } from "fs"
import { cwd } from "process"
import {
	createProduct,
	deleteFromDb,
	findById,
	findDuplicate,
	findByName,
	findAllByStoreId,
	updateNameAndQuantity,
	updatePictures,
} from "../database/functions.js"

/**
 * @param {string} storeId Store id
 * @param {string} userId User id
 * @return {{error: string | null, data: [product] | null}}
 */
export async function getProducts(storeId, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const products = await findAllByStoreId(storeId, userId)

			if (!products)
				return resolve({
					error: "There isn't any product registered to the store",
					data: null,
				})

			return resolve({
				error: null,
				data: products,
			})
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} name Product name
 * @param {number} quantity Num of products in store
 * @param {number} files Picture names
 * @param {string} storeId Store id
 * @param {string} userId User id
 * @return {{error: string | null, data: product | null}}
 */
export async function registerProduct(name, quantity, files, storeId, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const isExists = await findByName(name, storeId, userId)

			if (isExists)
				return resolve({
					error: "Product already exists",
					data: null,
				})

			const product = await createProduct(
				name,
				quantity,
				files,
				storeId,
				userId
			)

			return resolve({
				error: null,
				data: product.dataValues,
			})
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id
 * @param {string} storeId
 * @param {string} userId User id
 * @return {{error: string | null, data: product | null}}
 */
export async function getProductById(id, storeId, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await findById(id, storeId, userId)

			if (!product)
				return resolve({
					error: "Product does not exists",
					data: null,
				})

			return resolve({
				error: null,
				data: product.dataValues,
			})
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id
 * @param {string} name
 * @param {number} quantity
 * @param {number} pictures
 * @param {string} storeId
 * @param {string} userId User id
 * @return {{error: string | null, data: product | null}}
 */
export async function updateProductById(id, name, quantity, storeId, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await findById(id, storeId, userId)

			if (!product)
				return resolve({
					error: "Product does not exists",
					data: null,
				})

			const isDuplicate = await findDuplicate(id, name, storeId, userId)

			if (isDuplicate)
				return resolve({
					error: "Product with that name already exists",
					data: null,
				})

			const updatedProduct = await updateNameAndQuantity(
				id,
				name,
				quantity
			)

			return resolve({
				error: null,
				data: updatedProduct,
			})
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id
 * @param {string} storeId
 * @param {string} userId User id
 * @return {string | null}
 */
export async function deleteProductById(id, storeId, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await findById(id, storeId, userId)

			if (!product) return resolve("Product does not exists")

			await deleteFromDb(id, storeId, userId)

			return resolve(null)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id Product id
 * @param {string} picture Picture name
 * @param {string} userId User id
 * @return {{error: string | null, data: {} | null}}
 */
export async function deleteProductPictures(
	storeId,
	productId,
	picture,
	userId
) {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await findById(productId, storeId, userId)

			if (!product)
				return resolve({
					error: "Product does not exists",
					data: null,
				})

			const pictures = product.pictures.filter((pic) => {
				if (pic != picture) return pic
			})

			const updatedProduct = await updatePictures(
				productId,
				storeId,
				pictures,
				userId
			)

			unlink(cwd() + `/uploads/${picture}`, (err) => {
				if (err)
					return resolve({
						error: "Picture does not exists",
						data: null,
					})

				return resolve({ error: null, data: updatedProduct })
			})
		} catch (e) {
			reject(e)
		}
	})
}

/**
 *
 * @param {string} storeId
 * @param {string} productId
 * @param {[{}]} pictures
 * @param {string} userId User id
 * @return {{error: string | null, data: {} | null}}
 */
export async function updateProductPictures(
	storeId,
	productId,
	pictures,
	userId
) {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await findById(productId, storeId, userId)

			if (!product)
				return resolve({
					error: "Product does not exists",
					data: null,
				})

			const newPictures = [
				...product.pictures,
				...pictures.map((picture) => picture.filename),
			]

			const updatedProduct = await updatePictures(
				productId,
				storeId,
				newPictures,
				userId
			)

			return resolve({ error: null, data: updatedProduct })
		} catch (e) {
			reject(e)
		}
	})
}
