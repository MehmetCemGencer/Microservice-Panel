import { Op } from "sequelize"
import { Product } from "./models/index.js"

/**
 * @param {string} storeId Store id
 * @param {string} userId User id
 * @return {[{}]}
 */
export async function findAllByStoreId(storeId, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const products = await Product.findAll({
				where: { store_id: storeId, user_id: userId },
			})

			return resolve(products)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} name Product name
 * @param {string} storeId Store id
 * @param {string} userId User id
 * @return {{}}
 */
export async function findByName(name, storeId, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await Product.findOne({
				where: { name, store_id: storeId },
			})

			return resolve(product)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id Product id
 * @param {string} storeId Store id
 * @param {string} userId User id
 * @return {{}}
 */
export async function findById(id, storeId, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await Product.findOne({
				where: { id, store_id: storeId, user_id: userId },
			})

			return resolve(product)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id Product id
 * @param {string} name Product name
 * @param {string} storeId Store id
 * @param {string} userId User id
 * @return {{}}
 */
export async function findDuplicate(id, name, storeId, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await Product.findOne({
				where: {
					name,
					store_id: storeId,
					user_id: userId,
					id: {
						[Op.not]: id,
					},
				},
			})

			return resolve(product)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} name Product name
 * @param {number} quantity Product quantity
 * @param {[object]} pictures Product pictures
 * @param {string} storeId Store id
 * @param {string} userId User id
 * @return {{}}
 */
export async function createProduct(name, quantity, pictures, storeId, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await Product.create({
				name,
				quantity,
				pictures: pictures?.map((picture) => picture.filename),
				store_id: storeId,
				user_id: userId,
			})

			return resolve(product)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id Product id
 * @param {string} name Product name
 * @param {number} quantity Product quantity
 * @param {string} userId User id
 * @return {{}}
 */
export async function updateNameAndQuantity(id, name, quantity, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await Product.update(
				{ name, quantity },
				{
					where: { id, store_id: storeId, user_id: userId },
					returning: true,
				}
			)

			return resolve(product[1][0].dataValues)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id Product id
 * @param {string} storeId Store id
 * @param {string} userId User id
 * @return {true}
 */
export async function deleteFromDb(id, storeId, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			await Product.destroy({
				where: { id, store_id: storeId, user_id: userId },
			})

			return resolve(true)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id Product id
 * @param {string} storeId Store id
 * @param {[{}]} pictures Product pictures
 * @param {string} userId User id
 * @return {{}}
 */
export async function updatePictures(id, storeId, pictures, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const updatedProduct = await Product.update(
				{ pictures },
				{
					where: { id, store_id: storeId, user_id: userId },
					returning: true,
				}
			)

			return resolve(updatedProduct[1][0].dataValues)
		} catch (e) {
			reject(e)
		}
	})
}
