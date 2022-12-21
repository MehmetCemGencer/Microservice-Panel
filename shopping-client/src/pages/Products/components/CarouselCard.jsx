import {
	createStyles,
	Image,
	Card,
	Text,
	Group,
	Button,
	Modal,
	Stack,
} from "@mantine/core"
import { Carousel } from "@mantine/carousel"
import { IconEdit, IconTrash } from "@tabler/icons"
import { useDispatch, useSelector } from "react-redux"
import {
	deleteProduct,
	getAllProducts,
} from "../../../redux/slices/productSlice"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const useStyles = createStyles((theme, _params, getRef) => ({
	carousel: {
		"&:hover": {
			[`& .${getRef("carouselControls")}`]: {
				opacity: 1,
			},
		},
	},

	carouselControls: {
		ref: getRef("carouselControls"),
		transition: "opacity 150ms ease",
		opacity: 0,
	},

	carouselIndicator: {
		width: 4,
		height: 4,
		transition: "width 250ms ease",

		"&[data-active]": {
			width: 16,
		},
	},
}))

export default function CarouselCard({ product }) {
	const { id, name, quantity, pictures, createdAt, updatedAt } = product
	const { isLoading } = useSelector((state) => state.product)
	const [open, setOpen] = useState(false)
	const { classes } = useStyles()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	async function handleDelete() {
		await dispatch(deleteProduct(id))
		setOpen(false)
		await dispatch(getAllProducts())
	}

	function handleEdit(id) {
		navigate(`/products/update/${id}`)
	}

	return (
		<>
			<Card key={id} radius="md" withBorder p="xl">
				<Card.Section>
					{pictures?.length != 0 && (
						<Carousel
							withIndicators
							loop
							classNames={{
								root: classes.carousel,
								controls: classes.carouselControls,
								indicator: classes.carouselIndicator,
							}}
						>
							{pictures.map((picture) => (
								<Carousel.Slide key={picture}>
									<Image
										key={picture}
										fit="contain"
										src={`http://localhost:8000/product/products/${picture}`}
										height={300}
									/>
								</Carousel.Slide>
							))}
						</Carousel>
					)}
				</Card.Section>

				<Group position="apart" mt="lg">
					<Text weight={500} size="xl">
						Name: {name}
					</Text>
					<Text size="xl" weight={500}>
						Quantity: {quantity}
					</Text>
				</Group>

				<Text size="sm" color="dimmed" mt="sm">
					Create desc field
				</Text>

				<Group position="apart" mt="md">
					<Button
						radius="md"
						color="red"
						leftIcon={<IconTrash />}
						onClick={() => setOpen(true)}
					>
						Delete
					</Button>
					<Button
						radius="md"
						leftIcon={<IconEdit />}
						onClick={() => handleEdit(id)}
					>
						Edit
					</Button>
				</Group>
			</Card>
			<Modal
				centered
				opened={open}
				withCloseButton={false}
				onClose={() => setOpen(false)}
			>
				<Stack>
					<Text
						color="dimmed"
						transform="initial"
						weight={700}
						size="xl"
						sx={{ textAlign: "center" }}
					>
						Are you sure?
					</Text>
					<Group position="center">
						<Button
							radius="md"
							color="red"
							onClick={handleDelete}
							loading={isLoading}
							leftIcon={<IconTrash />}
						>
							Delete
						</Button>
						<Button
							radius="md"
							color="green"
							onClick={() => setOpen(false)}
						>
							No
						</Button>
					</Group>
				</Stack>
			</Modal>
		</>
	)
}
