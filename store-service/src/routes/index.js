import store from "./store.js"

/**
 * Define routes for the app
 *
 * @param {Express} app
 */
export function routes(app) {
	/**
	 * Store service
	 *
	 * @private
	 * @name /
	 * @function
	 */
	app.use("/", store)
}
