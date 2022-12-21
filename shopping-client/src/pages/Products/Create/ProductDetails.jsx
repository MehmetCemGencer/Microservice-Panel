import { Group, NumberInput, Paper, Text, TextInput } from "@mantine/core"

export default function ProductDetails({
	name,
	quantity,
	setQuantity,
	handleNameChange,
}) {
	return (
		<Paper withBorder shadow="xs" p="xl">
			<Group position="center" spacing="xl">
				<Text color="dimmed" transform="initial" weight={700} size="xl">
					Product name:
				</Text>
				<TextInput
					placeholder="Product Name"
					value={name}
					onChange={(e) => handleNameChange(e)}
				/>
				<Text color="dimmed" transform="initial" weight={700} size="xl">
					Product Quantity:
				</Text>
				<NumberInput
					value={quantity}
					onChange={setQuantity}
					placeholder="0"
				/>
			</Group>
		</Paper>
	)
}
