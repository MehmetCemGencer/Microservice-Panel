import express from "express"
import { upload } from "../config/multer.js"
import { body, param, query } from "express-validator"
import { validationErrorCheck } from "../middleware/validationErrorCheck.js"
import {
	createProductController,
	deleteProductByIdController,
	deleteProductPicturesController,
	getProductByIdController,
	getProductsController,
	updateProductByIdController,
	uploadProductPicturesController,
} from "../controllers/product.js"

const router = express.Router()

const createMiddlewares = [
	body("name")
		.exists()
		.withMessage('"name" field must exists')
		.isLength({ min: 2 })
		.withMessage("Product name must be longer than 1 character"),
	body("quantity")
		.exists()
		.withMessage('"quantity" field must exists')
		.isNumeric()
		.withMessage("Quantity must be a number"),
	body("storeId")
		.exists()
		.withMessage('"storeId" field must exists')
		.isUUID(4)
		.withMessage("Invalid store id"),
	validationErrorCheck,
]

const updateMiddlewares = [
	body("id").not().exists().withMessage('"id" field must not be present'),
	body("name")
		.exists()
		.withMessage('"name" field must exists')
		.isLength({ min: 2 })
		.withMessage("Product name must be longer than 1 character"),
	body("quantity")
		.exists()
		.withMessage('"quantity" field must exists')
		.isNumeric()
		.withMessage("Quantity must be a number"),
	query("storeId")
		.exists()
		.withMessage('"storeId" field must exists')
		.isUUID(4)
		.withMessage("Invalid store id"),
	validationErrorCheck,
]

const deleteMiddlewares = [
	param("id").isUUID(4).withMessage('"Id" field is not a valid UUID'),
	query("storeId").isUUID(4).withMessage('"Id" field is not a valid UUID'),
	validationErrorCheck,
]

/**
 * @module routes/
 */

/**
 * Get single product data of self store
 *
 * @private
 * @name GET /?id&storeId
 * @function
 * @param {string} id Product id
 * @param {string} storeId Store id
 */
router.get("/", getProductByIdController)
/**
 * Get all products of self store
 *
 * @private
 * @name GET /?storeId
 * @function
 * @param {string} storeId Store id
 */
router.get("/all", getProductsController)
/**
 * Create product
 *
 * @private
 * @name POST /
 * @function
 * @param {string} name
 * @param {number} quantity
 * @param {string} storeId Store id
 */
router.post(
	"/",
	[upload.array("files"), createMiddlewares],
	createProductController
)
/**
 * Update product name and quantity
 *
 * @private
 * @name PUT /:id?storeId
 * @function
 * @param {string} id Product id
 * @param {string} name Product name
 * @param {number} quantity Product quantity
 * @param {string} storeId Store id
 */
router.put("/:id", updateMiddlewares, updateProductByIdController)
/**
 * Delete product
 *
 * @private
 * @name DELETE /:id?storeId
 * @function
 * @param {string} id Product id
 * @param {string} storeId Store id
 */
router.delete("/:id", deleteMiddlewares, deleteProductByIdController)
/**
 * Update product pictures
 *
 * @private
 * @name POST /pictures/:id?storeId
 * @function
 * @param {string} id Product id
 * @param {string} storeId Store id
 */
router.put(
	"/pictures/:id",
	upload.array("pictures"),
	uploadProductPicturesController
)
/**
 * Delete product picture
 *
 * @private
 * @name DELETE /pictures/:id?storeId&picture
 * @function
 * @param {string} id Product id
 * @param {string} picture Picture name
 * @param {string} storeId Store id
 */
router.delete("/pictures/:id", deleteProductPicturesController)

export default router
