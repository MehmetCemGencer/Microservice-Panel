import {
	Button,
	Group,
	Modal,
	Paper,
	Stack,
	Text,
	TextInput,
} from "@mantine/core"
import { IconDeviceFloppy, IconEdit } from "@tabler/icons"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateStoreName } from "../../redux/slices/storeSlice"

export default function StoreName() {
	const dispatch = useDispatch()
	const { id, name, isLoading } = useSelector((state) => state.store)
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState("")

	function handleChange(e) {
		setValue(e.currentTarget.value)
	}

	async function handleUpdate() {
		try {
			const res = await dispatch(updateStoreName({ id, name: value }))

			if (!res.error) setOpen(false)
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
					store name:
				</Text>
				<Text weight={700} size="xl">
					{name ? name : "Please give your store a name"}
				</Text>
				<Button
					radius="md"
					leftIcon={<IconEdit />}
					onClick={() => setOpen(true)}
				>
					Edit
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
							store name:
						</Text>
						<TextInput
							radius="md"
							size="xl"
							value={value}
							onChange={handleChange}
						/>
						<Button
							radius="md"
							leftIcon={<IconDeviceFloppy />}
							color="green"
							size="xl"
							onClick={handleUpdate}
							loading={isLoading}
						>
							Save
						</Button>
					</Stack>
				</Modal>
			</Group>
		</Paper>
	)
}
