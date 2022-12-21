import { rm } from "fs/promises"
import { asyncHandler } from "../middleware/asyncHandler.js"
import {
	createStore,
	deleteStoreById,
	deleteStoreLogo,
	getMyStore,
	updateStoreById,
	updateStoreLogoById,
} from "../services/index.js"

export const createStoreController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const { error, data } = await createStore(
			req.headers.uid,
			req.body.name
		)

		if (error) return res.status(400).json({ message: error })

		res.status(201).json({ message: "Store created", data })
	}
)

export const updateStoreByIdController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const id = req.params.id
		const store = req.body

		const { error, data } = await updateStoreById(
			id,
			req.headers.uid,
			store
		)

		if (error) return res.status(400).json({ message: error })

		res.json({ message: "User updated", data })
	}
)

export const deleteStoreByIdController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const id = req.params.id

		const isDeletedError = await deleteStoreById(id, req.headers.uid)

		if (isDeletedError)
			return res.status(400).json({
				message: isDeletedError,
			})

		res.json({ message: "Store deleted" })
	}
)

export const getMyStoreController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const store = await getMyStore(req.headers.uid)

		if (!store)
			return res
				.status(400)
				.json({ message: "No store registered to your account" })

		res.json({ data: store })
	}
)

export const uploadImageController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const store = await getMyStore(req.headers.uid)

		if (!store)
			return res
				.status(400)
				.json({ message: "Please create a new store" })

		if (store.logo && store.logo != "") {
			await rm("uploads/" + store.logo)
		}

		const { error, data } = await updateStoreLogoById(
			store.id,
			req.headers.uid,
			req.file.filename
		)

		if (error) return res.status(400).json({ message: error })

		res.send({ data })
	}
)

export const deleteImageController = asyncHandler(
	/**
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async (req, res) => {
		const store = await getMyStore(req.headers.uid)

		if (!store)
			return res
				.status(400)
				.json({ message: "No store registered to your account" })

		if (!store.logo)
			return res
				.status(400)
				.json({ message: "Store does not have a logo" })

		const updatedStore = await deleteStoreLogo(store.id, req.headers.uid)

		res.json({ data: updatedStore })
	}
)
