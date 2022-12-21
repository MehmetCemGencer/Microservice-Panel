import express from "express"
import { body, param } from "express-validator"
import { upload } from "../config/multer.js"
import { validationErrorCheck } from "../middleware/validationErrorCheck.js"
import {
	createStoreController,
	deleteImageController,
	deleteStoreByIdController,
	getMyStoreController,
	updateStoreByIdController,
	uploadImageController,
} from "../controllers/index.js"

const router = express.Router()

const createMiddlewares = [
	body("name")
		.exists()
		.withMessage('"name" field must exists')
		.isLength({ min: 2 })
		.withMessage("Store name must be longer than 1 character"),
	body("id").not().exists().withMessage('"id" field must not be present'),
	body("user_id")
		.not()
		.exists()
		.withMessage('"user_id" field must not be present'),
	validationErrorCheck,
]

const updateMiddlewares = [
	param("id").isUUID(4).withMessage('"id" field is not a valid UUID'),
	body("name")
		.exists()
		.withMessage('"name" field must exists')
		.isLength({ min: 2 })
		.withMessage("Store name must be longer than 1 character"),
	body("id").not().exists().withMessage('"id" field must not be present'),
	body("user_id")
		.not()
		.exists()
		.withMessage('"user_id" field must not be present'),
	validationErrorCheck,
]

/**
 * @module routes/
 */

/**
 * Get self store data
 *
 * @private
 * @name GET /
 * @function
 */
router.get("/", getMyStoreController)
/**
 * Create new store
 *
 * @private
 * @name POST /
 * @function
 */
router.post("/", createMiddlewares, createStoreController)
/**
 * Update self store data
 *
 * @private
 * @name PUT /:id
 * @function
 * @param {string} id Store id
 */
router.put("/:id", updateMiddlewares, updateStoreByIdController)
/**
 * Delete self store
 *
 * @private
 * @name DEL /:id
 * @function
 * @param {string} id Store id
 */
router.delete("/:id", deleteStoreByIdController)
/**
 * Upload store logo
 *
 * @private
 * @name POST /logo
 * @function
 */
router.post("/logo", upload.single("img"), uploadImageController)
/**
 * Delete store logo
 *
 * @private
 * @name POST /logo/:id
 * @function
 * @param {string} id Store id
 */
router.delete("/logo/:name", deleteImageController)

export default router
