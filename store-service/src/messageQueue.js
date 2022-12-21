import { createStoreByQueue, deleteStoreById } from "./services/index.js"
import { channel } from "../index.js"

export async function listenToMessages() {
	try {
		await listenRegister()
		await listenDelete()
	} catch (e) {
		console.log(e)
	}
}

export async function listenRegister() {
	try {
		await channel.assertExchange("store", "direct", {
			durable: false,
		})

		await channel.assertQueue("register", {
			exclusive: true,
		})

		await channel.bindQueue("register", "store", "create")

		channel.consume("register", async (msg) => {
			try {
				if (msg != null) {
					const id = msg.content.toString()

					const isSuccess = await createStoreByQueue(id)

					if (isSuccess) return channel.ack(msg)

					channel.reject(msg, false)
				}
			} catch (e) {
				console.log(e)
			}
		})
	} catch (e) {
		console.log(e)
	}
}

export async function listenDelete() {
	try {
		await channel.assertExchange("store", "direct", {
			durable: false,
		})

		await channel.assertQueue("delete", {
			exclusive: true,
		})

		await channel.bindQueue("delete", "store", "delete")

		channel.consume("delete", async (msg) => {
			try {
				if (msg != null) {
					const id = msg.content.toString()

					const isSuccess = await deleteStoreById(id)

					if (isSuccess) return channel.ack(msg)

					channel.reject(msg, false)
				}
			} catch (e) {
				console.log(e)
			}
		})
	} catch (e) {
		console.log(e)
	}
}
