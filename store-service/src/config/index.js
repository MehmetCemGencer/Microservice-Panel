import { readFileSync, existsSync } from "fs"

export const DB_URL = readVariableFromFile("store_db_url", "store-db")
export const DB_PORT = parseInt(readVariableFromFile("store_db_port", 5432))
export const DB_USERNAME = readVariableFromFile("store_db_username", "postgres")
export const DB_PASSWORD = readVariableFromFile("store_db_password", "postgres")
export const DB_NAME = readVariableFromFile("store_db_name", "store")
export const MQ_URL = readVariableFromFile("store_mq_url", "amqp://rabbitmq")

/**
 * @param {string} fileName File name
 * @param {string | number} defaultValue Value to be used if file does not exists
 * @return {string | number}
 */
function readVariableFromFile(fileName, defaultValue) {
	return existsSync(`../run/secrets/${fileName}`)
		? readFileSync(`../run/secrets/${fileName}`, "utf-8")
		: defaultValue
}
