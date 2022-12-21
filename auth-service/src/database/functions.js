import { User } from "./models/index.js"

export async function getUserById(id) {
	return new Promise(async (res, rej) => {
		try {
			const user = await User.findByPk(id, {
				attributes: ["id", "username", "email"],
			})

			if (user) return res(user.dataValues)

			return res(null)
		} catch (e) {
			return rej(e)
		}
	})
}

export async function getUserByIdWithPassword(id) {
	return new Promise(async (res, rej) => {
		try {
			const user = await User.findByPk(id)

			if (user) return res(user.dataValues)

			return res(null)
		} catch (e) {
			return rej(e)
		}
	})
}

export async function getUserByEmail(email) {
	return new Promise(async (res, rej) => {
		try {
			const user = await User.findOne({
				where: { email },
				attributes: ["id", "email", "username"],
			})

			if (user) return res(user.dataValues)

			return res(null)
		} catch (e) {
			return rej(e)
		}
	})
}

export async function getUserByEmailWithPassword(email) {
	return new Promise(async (res, rej) => {
		try {
			const user = await User.findOne({
				where: { email },
			})

			if (user) return res(user.dataValues)

			return res(null)
		} catch (e) {
			return rej(e)
		}
	})
}

export async function createUser(username, email, password) {
	return new Promise(async (res, rej) => {
		try {
			const user = await User.create({ username, email, password })

			return res(user.dataValues)
		} catch (e) {
			return rej(e)
		}
	})
}

export async function deleteUser(id) {
	return new Promise(async (res, rej) => {
		try {
			const user = await User.findByPk(id)

			if (!user) return res(false)

			await user.destroy()

			return res(true)
		} catch (e) {
			return rej(e)
		}
	})
}
