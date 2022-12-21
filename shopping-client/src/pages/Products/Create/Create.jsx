import { Stack, Button, Paper, Center } from "@mantine/core"
import { IconDeviceFloppy } from "@tabler/icons"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createProduct } from "../../../redux/slices/productSlice"
import ImageDrop from "./ImageDrop"
import ProductDetails from "./ProductDetails"

export default function Create() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [name, setName] = useState("")
	const [quantity, setQuantity] = useState(0)
	const [files, setFiles] = useState([])
	const { isLoading } = useSelector((state) => state.product)

	function handleNameChange(e) {
		setName(e.target.value)
	}

	async function handleSave() {
		try {
			await dispatch(createProduct({ name, quantity, files }))
			navigate("/products")
		} catch (e) {}
	}

	return (
		<Stack spacing="xl">
			<ProductDetails
				name={name}
				quantity={quantity}
				setQuantity={setQuantity}
				handleNameChange={handleNameChange}
			/>
			<ImageDrop files={files} setFiles={setFiles} />
			<Paper withBorder shadow="xs" p="xl">
				<Center>
					<Button
						size="xl"
						radius="md"
						loading={isLoading}
						onClick={handleSave}
						leftIcon={<IconDeviceFloppy />}
					>
						Save
					</Button>
				</Center>
			</Paper>
		</Stack>
	)
}
