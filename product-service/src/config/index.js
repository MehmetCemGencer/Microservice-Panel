import { readFileSync, existsSync } from "fs"

export const DB_URL = readVariableFromFile("product_db_url", "product-db")
export const DB_PORT = parseInt(readVariableFromFile("product_db_port", 5432))
export const DB_USERNAME = readVariableFromFile(
	"product_db_username",
	"postgres"
)
export const DB_PASSWORD = readVariableFromFile(
	"product_db_password",
	"postgres"
)
export const DB_NAME = readVariableFromFile("product_db_name", "product")

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
