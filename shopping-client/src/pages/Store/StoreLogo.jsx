import {
	Button,
	FileInput,
	Group,
	Image,
	Modal,
	Paper,
	Stack,
	Text,
} from "@mantine/core"
import { useState } from "react"
import { IconDeviceFloppy, IconTrash, IconUpload } from "@tabler/icons"
import { useDispatch, useSelector } from "react-redux"
import { uploadStoreLogo, deleteStoreLogo } from "../../redux/slices/storeSlice"

export default function StoreLogo() {
	const dispatch = useDispatch()
	const { logo, isLoading } = useSelector((state) => state.store)
	const [open, setOpen] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)
	const [file, setFile] = useState()

	async function handleSave() {
		try {
			await dispatch(uploadStoreLogo(file))
			setOpen(false)
		} catch (e) {}
	}

	async function handleDelete() {
		try {
			await dispatch(deleteStoreLogo())
			setOpenDelete(false)
		} catch (e) {}
	}

	return (
		<Paper withBorder radius="md" shadow="xs" p="xl">
			<Group position="center" spacing="xl">
				<Text
					color="dimmed"
					transform="uppercase"
					weight={700}
					size="xl"
				>
					Store Logo:
				</Text>
				<Image
					withPlaceholder
					width={200}
					height={120}
					src={logo && "http://localhost:8000/store/logo/" + logo}
				/>
				<Button
					radius="md"
					leftIcon={<IconUpload />}
					onClick={() => setOpen(true)}
				>
					Upload Logo
				</Button>
				<Button
					radius="md"
					leftIcon={<IconTrash />}
					color="red"
					onClick={() => setOpenDelete(true)}
				>
					Delete Logo
				</Button>
				<Modal
					centered
					opened={open}
					withCloseButton={false}
					onClose={() => setOpen(false)}
				>
					<Stack align="stretch" spacing="xl">
						<Text
							color="dimmed"
							transform="uppercase"
							weight={700}
							size="xl"
							sx={{ textAlign: "center" }}
						>
							upload image:
						</Text>
						<FileInput
							radius="md"
							size="xl"
							placeholder="Select Image"
							variant="filled"
							accept="image/png,image/jpeg"
							icon={<IconUpload size={14} />}
							value={file}
							onChange={setFile}
						/>

						<Button
							radius="md"
							leftIcon={<IconDeviceFloppy />}
							color="green"
							size="xl"
							onClick={handleSave}
							loading={isLoading}
						>
							Save
						</Button>
					</Stack>
				</Modal>
				<Modal
					centered
					opened={openDelete}
					withCloseButton={false}
					onClose={() => setOpenDelete(false)}
				>
					<Stack align="stretch" spacing="xl">
						<Text
							color="dimmed"
							transform="initial"
							weight={700}
							size="xl"
							sx={{ textAlign: "center" }}
						>
							Are you sure you want to delete store logo?
						</Text>
						<Group position="center">
							<Button
								radius="md"
								color="red"
								onClick={handleDelete}
								loading={isLoading}
							>
								Delete
							</Button>
							<Button
								radius="md"
								color="green"
								onClick={() => setOpenDelete(false)}
							>
								No
							</Button>
						</Group>
					</Stack>
				</Modal>
			</Group>
		</Paper>
	)
}
