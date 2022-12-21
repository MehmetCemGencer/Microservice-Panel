import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
	deleteProductPicture,
	getProductById,
	updateProductNameQuantity,
	updateProductPictures,
} from "../../../redux/slices/productSlice"
import {
	Button,
	Card,
	Group,
	Image,
	Modal,
	NumberInput,
	Paper,
	SimpleGrid,
	Space,
	Stack,
	Text,
	TextInput,
} from "@mantine/core"
import { IconDeviceFloppy, IconEdit, IconTrash } from "@tabler/icons"
import ImageDrop from "../Create/ImageDrop"

export default function Update() {
	const baseUrl = "http://localhost:8000/product/products/"
	const dispatch = useDispatch()
	const { id } = useParams()
	const { product, isLoading } = useSelector((state) => state.product)
	const [name, setName] = useState("")
	const [quantity, setQuantity] = useState(0)
	const [pictures, setPictures] = useState([])
	const [modalPicture, setModalPicture] = useState(null)
	const [editModalOpen, setEditModalOpen] = useState(false)
	const [pictureModalOpen, setPictureModalOpen] = useState(false)

	useEffect(() => {
		const cancelToken = axios.CancelToken.source()

		;(async () => {
			await dispatch(
				getProductById({ id, cancelToken: cancelToken.token })
			)
		})()

		return () => {
			cancelToken.cancel()
		}
	}, [])

	function handleEdit() {
		setName(product.name)
		setQuantity(product.quantity)
		setEditModalOpen(true)
	}

	function handleProductNameChange(e) {
		setName(e.target.value)
	}

	function handleProductQuantityChange(value) {
		setQuantity(value)
	}

	async function handleDelete(picture) {
		await dispatch(deleteProductPicture({ id, picture }))
	}

	async function handleNameQuantityUpdate() {
		await dispatch(
			updateProductNameQuantity({
				id,
				name: name,
				quantity: quantity,
			})
		)
		setEditModalOpen(false)
	}

	async function handlePictureUpdate() {
		await dispatch(updateProductPictures({ id, pictures }))
		setPictures([])
	}

	return (
		<>
			<Stack>
				<Paper withBorder shadow="xs" p="xl">
					<Group position="center" spacing="xl">
						<Text
							size="xl"
							weight={700}
							color="dimmed"
							transform="initial"
						>
							Product name:
						</Text>
						<Text
							size="xl"
							weight={700}
							color="dimmed"
							transform="initial"
						>
							{product?.name}
						</Text>
						<Space />
						<Text
							size="xl"
							weight={700}
							color="dimmed"
							transform="initial"
						>
							Product Quantity:
						</Text>
						<Text
							size="xl"
							weight={700}
							color="dimmed"
							transform="initial"
						>
							{product?.quantity}
						</Text>
						<Space />
						<Button leftIcon={<IconEdit />} onClick={handleEdit}>
							Edit
						</Button>
					</Group>
				</Paper>
				<ImageDrop files={pictures} setFiles={setPictures} />
				{pictures?.length > 0 && (
					<Paper withBorder shadow="xs" p="xl">
						<Group position="center">
							<Button
								onClick={handlePictureUpdate}
								leftIcon={<IconDeviceFloppy />}
								loading={isLoading}
							>
								Upload New Pictures
							</Button>
						</Group>
					</Paper>
				)}
				<Paper withBorder shadow="xs" p="xl">
					<SimpleGrid
						cols={4}
						breakpoints={[{ maxWidth: "sm", cols: 1 }]}
						mt={product?.pictures?.length > 0 ? "xl" : 0}
					>
						{product?.pictures?.map((picture) => (
							<Card key={picture} radius="md" withBorder>
								<Card.Section>
									<Image
										src={`${baseUrl}${picture}`}
										onClick={() => {
											setModalPicture(picture)
											setPictureModalOpen(true)
										}}
									/>
								</Card.Section>
								<Card.Section>
									<Button
										fullWidth
										color="red"
										leftIcon={<IconTrash />}
										onClick={async () =>
											await handleDelete(picture)
										}
									>
										Delete
									</Button>
								</Card.Section>
							</Card>
						))}
					</SimpleGrid>
				</Paper>
				<Modal
					centered
					size="80%"
					opened={pictureModalOpen}
					withCloseButton={false}
					onClose={() => {
						setPictureModalOpen(false)
						setModalPicture(null)
					}}
				>
					<Image src={`${baseUrl}${modalPicture}`} />
				</Modal>
				<Modal
					centered
					opened={editModalOpen}
					withCloseButton={false}
					onClose={() => {
						setEditModalOpen(false)
					}}
				>
					<Stack align="stretch" spacing="xl">
						<Text
							size="xl"
							weight={700}
							color="dimmed"
							transform="uppercase"
							sx={{ textAlign: "center" }}
						>
							Product name:
						</Text>
						<TextInput
							size="xl"
							radius="md"
							value={name}
							onChange={handleProductNameChange}
						/>
						<Text
							size="xl"
							weight={700}
							color="dimmed"
							transform="uppercase"
							sx={{ textAlign: "center" }}
						>
							Product quantity:
						</Text>
						<NumberInput
							size="xl"
							radius="md"
							value={quantity}
							onChange={handleProductQuantityChange}
							parser={(value) => value.replace(/\D/g, "")}
							formatter={(value) =>
								new Intl.NumberFormat("tr-TR").format(value)
							}
						/>
						<Button
							size="xl"
							radius="md"
							color="green"
							leftIcon={<IconDeviceFloppy />}
							loading={isLoading}
							onClick={handleNameQuantityUpdate}
						>
							Update
						</Button>
					</Stack>
				</Modal>
			</Stack>
		</>
	)
}
