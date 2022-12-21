import amqplib from "amqplib"
import { MQ_URL } from "../config/index.js"

export async function createChannel() {
	try {
		const connection = await amqplib.connect(MQ_URL)
		const channel = await connection.createChannel()

		await channel.assertExchange("store", "direct", {
			durable: false,
		})

		return channel
	} catch (e) {
		throw new Error("Error while creating a channel")
	}
}
