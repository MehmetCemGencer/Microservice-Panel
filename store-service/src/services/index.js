import {
	createNewStore,
	createNewStoreOnlyUserId,
	deleteStore,
	findStoreByIdAndUserId,
	findStoreByUserId,
	updateLogoNull,
	updateStoreLogo,
	updateStoreNameAndLogo,
} from "../database/functions.js"

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
 * @param {string} name - Store name
 * @return {{error: string | null, data: store | null}}
 */
export async function createStore(userId, name) {
	return new Promise(async (resolve, reject) => {
		try {
			const isExists = await findStoreByUserId(userId)

			if (!isExists) {
				const store = await createNewStore(name, userId)

				return resolve({
					error: null,
					data: store,
				})
			}

			resolve({
				error: "You already have a store",
				data: null,
			})
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} userId - User id
 * @return {boolean}
 */
export async function createStoreByQueue(userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const isExists = await findStoreByUserId(userId)

			if (!isExists) {
				await createNewStoreOnlyUserId(userId)

				return resolve(true)
			}

			resolve(false)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id - Store id
 * @param {string} userId - User id
 * @param {{name: string, logo: string}} fields - Fields for updating the store object
 * @return {{error: string | null, data: store|null}}
 */
export async function updateStoreById(id, userId, { name, logo }) {
	return new Promise(async (resolve, reject) => {
		try {
			const updatedStore = await updateStoreNameAndLogo(
				id,
				name,
				logo,
				userId
			)

			resolve({
				error: null,
				data: updatedStore,
			})
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id - Store id
 * @param {string} userId - User id
 * @param {string} logo - Store logo
 * @return {{error: string | null, data: store|null}}
 */
export async function updateStoreLogoById(id, userId, logo) {
	return new Promise(async (resolve, reject) => {
		try {
			const updatedStore = await updateStoreLogo(id, logo, userId)

			resolve({
				error: null,
				data: updatedStore,
			})
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id - Store id
 * @param {string} userId - User id
 * @return {null | string}
 */
export async function deleteStoreById(id, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const store = await findStoreByIdAndUserId(id, userId)

			if (!store) return resolve("No store found")

			await deleteStore(id, userId)

			resolve(null)
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} userId - Store id
 * @return {store}
 */
export async function getMyStore(userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const store = await findStoreByUserId(userId)

			if (store) return resolve(store)

			resolve(null)
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
export async function deleteStoreLogo(id, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const store = await updateLogoNull(id, userId)

			return resolve(store)
		} catch (e) {
			reject(e)
		}
	})
}
