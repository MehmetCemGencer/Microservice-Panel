import auth from "./auth.js"
import proxy from "express-http-proxy"
import { privateRoute } from "../middleware/privateRoute.js"

// Multipart must be set here for other services to parse the files
const isMultipartRequest = function (req) {
	const contentTypeHeader = req.headers["content-type"]
	return contentTypeHeader && contentTypeHeader.indexOf("multipart") > -1
}

const productProxyMiddleware = function (req, res, next) {
	return proxy("http://product:8000", {
		proxyReqPathResolver: function (req) {
			return req.url
		},
		parseReqBody: !isMultipartRequest(req),
		proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
			proxyReqOpts.headers["uid"] = srcReq.uid
			return proxyReqOpts
		},
	})(req, res, next)
}

const storeProxyMiddleware = function (req, res, next) {
	return proxy("http://store:8000", {
		proxyReqPathResolver: function (req) {
			return req.url
		},
		parseReqBody: !isMultipartRequest(req),
		proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
			proxyReqOpts.headers["uid"] = srcReq.uid
			return proxyReqOpts
		},
	})(req, res, next)
}

/**
 * Define routes for the app
 *
 * @param {Express} app
 * @param {import("amqplib").Channel} channel
 */
export function routes(app) {
	/**
	 * Authentication service
	 *
	 * @name /
	 * @function
	 */
	app.use("/", auth)
	/**
	 * Product service
	 *
	 * @private
	 * @name /product
	 * @function
	 */
	app.use("/product", privateRoute, productProxyMiddleware)
	/**
	 * Store service
	 *
	 * @private
	 * @name /store
	 * @function
	 */
	app.use("/store", privateRoute, storeProxyMiddleware)
}
