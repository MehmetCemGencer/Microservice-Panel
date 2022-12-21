import { Store } from "./models/index.js"

/**
 * @typedef store
 * @type {object}
 * @property {string} id - Store id
 * @property {string} name - Store name
 * @property {string} logo - Store logo
 * @property {string} user_id - User id
 */

/**
 * @param {string} userId - User id
 * @return {store}
 */
export async function findStoreByUserId(userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const store = await Store.findOne({ where: { user_id: userId } })

			return resolve(store)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id - Store id
 * @param {string} userId - User id
 * @return {store}
 */
export async function findStoreByIdAndUserId(id, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const store = await Store.findOne({
				where: { id, user_id: userId },
			})

			return resolve(store)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} userId - User id
 * @param {string} name - Store name
 * @return {store}
 */
export async function createNewStore(userId, name) {
	return new Promise(async (resolve, reject) => {
		try {
			const store = await Store.create({
				name,
				user_id: userId,
			})

			return resolve(store)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} userId - User id
 * @return {null}
 */
export async function createNewStoreOnlyUserId(userId) {
	return new Promise(async (resolve, reject) => {
		try {
			await Store.create({
				user_id: userId,
			})

			return resolve(null)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id - Store id
 * @param {string} name - Store name
 * @param {string} logo - Store logo
 * @param {string} userId - User id
 * @return {store}
 */
export async function updateStoreNameAndLogo(id, name, logo, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const updatedStore = await Store.update(
				{ name, logo },
				{ where: { id, user_id: userId }, returning: true }
			)

			return resolve(updatedStore[1][0].dataValues)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id - Store id
 * @param {string} logo - Store logo
 * @param {string} userId - User id
 * @return {store}
 */
export async function updateStoreLogo(id, logo, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const updatedStore = await Store.update(
				{ logo },
				{ where: { id, user_id: userId }, returning: true }
			)

			return resolve(updatedStore[1][0].dataValues)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id - Store id
 * @param {string} userId - User id
 * @return {boolean}
 */
export async function deleteStore(id, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			await Store.destroy({ where: { id, user_id: userId } })

			return resolve(true)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id - Store id
 * @param {string} userId - User id
 * @return {store}
 */
export async function updateLogoNull(id, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const store = await Store.update(
				{ logo: null },
				{ where: { id, user_id: userId }, returning: true }
			)

			return resolve(store[1][0].dataValues)
		} catch (e) {
			reject(e)
		}
	})
}
