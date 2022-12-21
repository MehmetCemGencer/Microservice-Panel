import { readFileSync, existsSync } from "fs"

export const SESSION_SECRET = existsSync("../run/secrets/auth_session_secret")
	? readFileSync("../run/secrets/auth_session_secret", "utf-8")
	: "secret"
export const DB_URL = existsSync("../run/secrets/auth_db_url")
	? readFileSync("../run/secrets/auth_db_url", "utf-8")
	: "auth-db"
export const DB_PORT = existsSync("../run/secrets/auth_db_port")
	? parseInt(readFileSync("../run/secrets/auth_db_port", "utf-8"))
	: 5432
export const DB_USERNAME = existsSync("../run/secrets/auth_db_username")
	? readFileSync("../run/secrets/auth_db_username", "utf-8")
	: "postgres"
export const DB_PASSWORD = existsSync("../run/secrets/auth_db_password")
	? readFileSync("../run/secrets/auth_db_password", "utf-8")
	: "postgres"
export const DB_NAME = existsSync("../run/secrets/auth_db_name")
	? readFileSync("../run/secrets/auth_db_name", "utf-8")
	: "auth"
export const REDIS_URL = existsSync("../run/secrets/auth_redis_url")
	? readFileSync("../run/secrets/auth_redis_url", "utf-8")
	: "redis"
export const REDIS_PORT = existsSync("../run/secrets/auth_redis_port")
	? parseInt(readFileSync("../run/secrets/auth_redis_port", "utf-8"))
	: 6379
export const MQ_URL = existsSync("../run/secrets/auth_mq_url")
	? readFileSync("../run/secrets/auth_mq_url", "utf-8")
	: "amqp://rabbitmq"
