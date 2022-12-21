import { asyncHandler } from "../middleware/asyncHandler.js"
import {
	registerProduct,
	deleteProductById,
	deleteProductPictures,
	getProductById,
	getProducts,
	updateProductById,
	updateProductPictures,
} from "../services/product.js"

export const getProductByIdController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const userId = req.headers.uid
		const { id, storeId } = req.query

		const { error, data } = await getProductById(id, storeId, userId)

		if (error) return res.status(400).json({ message: error })

		res.json({ data })
	}
)

export const getProductsController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const { storeId } = req.query
		const userId = req.headers.uid

		const { error, data } = await getProducts(storeId, userId)

		if (error) return res.status(400).json({ message: error })

		res.json({ data })
	}
)

export const createProductController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const { name, quantity, storeId } = req.body
		const userId = req.headers.uid

		const { error, data } = await registerProduct(
			name,
			quantity,
			req.files,
			storeId,
			userId
		)

		if (error) return res.status(400).json({ message: error })

		res.status(201).json({ message: "Product created", data })
	}
)

export const updateProductByIdController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const id = req.params.id
		const storeId = req.query.storeId
		const { name, quantity } = req.body
		const userId = req.headers.uid

		const { error, data } = await updateProductById(
			id,
			name,
			quantity,
			storeId,
			userId
		)

		if (error) return res.status(400).json({ message: error })

		res.json({ message: "Product succesfully updated", data })
	}
)

export const deleteProductByIdController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const { id } = req.params
		const { storeId } = req.query
		const userId = req.headers.uid

		const error = await deleteProductById(id, storeId, userId)

		if (error) return res.status(400).json({ message: error })

		res.json({ message: "Product deleted" })
	}
)

export const uploadProductPicturesController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const { id } = req.params
		const storeId = req.query.storeId
		const userId = req.headers.uid

		const { data, error } = await updateProductPictures(
			storeId,
			id,
			req.files,
			userId
		)

		if (error) return res.status(400).json({ message: error })

		res.json({ message: "Pictures uploaded", data })
	}
)

export const deleteProductPicturesController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const id = req.params.id
		const { storeId, picture } = req.query
		const userId = req.headers.uid

		const { error, data } = await deleteProductPictures(
			storeId,
			id,
			picture,
			userId
		)

		if (error) return res.status(400).json({ message: error })

		res.json({ message: "Picture deleted", data })
	}
)
