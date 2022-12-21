import {
	Group,
	Text,
	useMantineTheme,
	Paper,
	Image,
	SimpleGrid,
} from "@mantine/core"
import { IconUpload, IconPhoto, IconX } from "@tabler/icons"
import { Dropzone } from "@mantine/dropzone"
import { showNotification } from "@mantine/notifications"

export default function ImageDrop({ files, setFiles }) {
	const theme = useMantineTheme()

	const previews = files.map((file, index) => {
		const imageUrl = URL.createObjectURL(file)

		return (
			<Image
				key={index}
				src={imageUrl}
				imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
			/>
		)
	})

	return (
		<Paper withBorder shadow="xs" p="xl">
			<Dropzone
				onDrop={setFiles}
				onReject={(files) => {
					files.map((file) => {
						file.errors?.map((error) => {
							if (error.code == "file-too-large") {
								return showNotification({
									message:
										file.file.name +
										" File size cannot be bigger than 5mb",
									color: "red",
									autoClose: 10000,
								})
							}

							showNotification({
								message: file.file.name + " " + error.message,
								color: "red",
								autoClose: 10000,
							})
						})
					})
				}}
				maxSize={5 * 1024 ** 2}
				accept={["image/png", "image/jpg", "image/jpeg"]}
			>
				<Group
					position="center"
					spacing="xl"
					style={{ minHeight: 220, pointerEvents: "none" }}
				>
					<Dropzone.Accept>
						<IconUpload
							size={50}
							stroke={1.5}
							color={
								theme.colors[theme.primaryColor][
									theme.colorScheme === "dark" ? 4 : 6
								]
							}
						/>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<IconX
							size={50}
							stroke={1.5}
							color={
								theme.colors.red[
									theme.colorScheme === "dark" ? 4 : 6
								]
							}
						/>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<IconPhoto size={50} stroke={1.5} />
					</Dropzone.Idle>

					<div>
						<Text size="xl" inline>
							Drag images here or click to select files
						</Text>
						<Text size="sm" color="dimmed" inline mt={7}>
							Attach as many files as you like, each file should
							not exceed 5mb
						</Text>
					</div>
				</Group>
			</Dropzone>
			<SimpleGrid
				cols={4}
				breakpoints={[{ maxWidth: "sm", cols: 1 }]}
				mt={previews.length > 0 ? "xl" : 0}
			>
				{previews}
			</SimpleGrid>
		</Paper>
	)
}
