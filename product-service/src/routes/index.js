import product from "./product.js"

/**
 * Define routes for the app
 *
 * @param {Express} app
 */
export function routes(app) {
	/**
	 * Product service
	 *
	 * @private
	 * @name /
	 * @function
	 */
	app.use("/", product)
}
