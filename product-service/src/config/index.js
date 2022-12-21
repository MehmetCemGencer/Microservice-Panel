import { readFileSync, existsSync } from "fs"

export const DB_URL = existsSync("../run/secrets/product_db_url")
	? readFileSync("../run/secrets/product_db_url", "utf-8")
	: "product-db"
export const DB_PORT = existsSync("../run/secrets/product_db_port")
	? parseInt(readFileSync("../run/secrets/product_db_port", "utf-8"))
	: 5432
export const DB_USERNAME = existsSync("../run/secrets/product_db_username")
	? readFileSync("../run/secrets/product_db_username", "utf-8")
	: "postgres"
export const DB_PASSWORD = existsSync("../run/secrets/product_db_password")
	? readFileSync("../run/secrets/product_db_password", "utf-8")
	: "postgres"
export const DB_NAME = existsSync("../run/secrets/product_db_name")
	? readFileSync("../run/secrets/product_db_name", "utf-8")
	: "product"
