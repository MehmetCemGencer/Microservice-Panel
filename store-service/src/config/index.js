import { readFileSync, existsSync } from "fs"

export const DB_URL = existsSync("../run/secrets/store_db_url")
	? readFileSync("../run/secrets/store_db_url", "utf-8")
	: "store-db"
export const DB_PORT = existsSync("../run/secrets/store_db_port")
	? parseInt(readFileSync("../run/secrets/store_db_port", "utf-8"))
	: 5432
export const DB_USERNAME = existsSync("../run/secrets/store_db_username")
	? readFileSync("../run/secrets/store_db_username", "utf-8")
	: "postgres"
export const DB_PASSWORD = existsSync("../run/secrets/store_db_password")
	? readFileSync("../run/secrets/store_db_password", "utf-8")
	: "postgres"
export const DB_NAME = existsSync("../run/secrets/store_db_name")
	? readFileSync("../run/secrets/store_db_name", "utf-8")
	: "store"
export const MQ_URL = existsSync("../run/secrets/store_mq_url")
	? readFileSync("../run/secrets/store_mq_url", "utf-8")
	: "amqp://rabbitmq"
