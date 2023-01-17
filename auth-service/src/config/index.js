import { readFileSync, existsSync } from "fs"

export const SESSION_SECRET = readVariableFromFile(
	"auth_session_secret",
	"secret"
)
export const DB_URL = readVariableFromFile("auth_db_url", "auth-db")
export const DB_PORT = parseInt(readVariableFromFile("auth_db_port", 5432))
export const DB_USERNAME = readVariableFromFile("auth_db_username", "postgres")
export const DB_PASSWORD = readVariableFromFile("auth_db_password", "postgres")
export const DB_NAME = readVariableFromFile("auth_db_name", "auth")
export const REDIS_URL = readVariableFromFile("auth_redis_url", "redis")
export const REDIS_PORT = parseInt(
	readVariableFromFile("auth_redis_port", 6379)
)
export const MQ_URL = readVariableFromFile("auth_mq_url", "amqp://rabbitmq")

/**
 * @param {string} fileName File name
 * @param {string | number} defaultValue Value to be used if file does not exists
 * @return {string | number}
 */
function readVariableFromFile(fileName, defaultValue) {
	return existsSync(`../run/secrets/${fileName}`)
		? readFileSync(fileName, "utf-8")
		: defaultValue
}
