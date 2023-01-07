import { readFileSync, existsSync } from "fs"

export const SESSION_SECRET = readVariableFromFile(
	"../run/secrets/auth_session_secret",
	"secret"
)
export const DB_URL = readVariableFromFile(
	"../run/secrets/auth_db_url",
	"auth-db"
)
export const DB_PORT = parseInt(
	readVariableFromFile("../run/secrets/auth_db_port", 5432)
)
export const DB_USERNAME = readVariableFromFile(
	"../run/secrets/auth_db_username",
	"postgres"
)
export const DB_PASSWORD = readVariableFromFile(
	"../run/secrets/auth_db_password",
	"postgres"
)
export const DB_NAME = readVariableFromFile(
	"../run/secrets/auth_db_name",
	"auth"
)
export const REDIS_URL = readVariableFromFile(
	"../run/secrets/auth_redis_url",
	"redis"
)
export const REDIS_PORT = parseInt(
	readVariableFromFile("../run/secrets/auth_redis_port", 6379)
)
export const MQ_URL = readVariableFromFile(
	"../run/secrets/auth_mq_url",
	"amqp://rabbitmq"
)

/**
 * @param {string} path File path
 * @param {string | number} defaultValue Value to be used if file does not exists
 * @return {string | number}
 */
function readVariableFromFile(path, defaultValue) {
	return existsSync(filePath) ? readFileSync(filePath, "utf-8") : defaultValue
}
