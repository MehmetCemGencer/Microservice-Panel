import axios from "axios"
import List from "./components/List"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button, Group, Paper, Stack, Text } from "@mantine/core"
import { getAllProducts } from "../../redux/slices/productSlice"

export default function Products() {
	const dispatch = useDispatch()
	const { products } = useSelector((state) => state.product)

	useEffect(() => {
		const cancelToken = axios.CancelToken.source()

		;(async () => {
			await dispatch(getAllProducts(cancelToken.token))
		})()

		return () => {
			cancelToken.cancel()
		}
	}, [])

	return (
		<Stack>
			<Paper>
				<Group position="apart">
					<Button
						radius="md"
						size="xl"
						component={Link}
						to="/products/create"
					>
						Create New Product
					</Button>
					<Text size="xl" weight={500}>
						Product Count: {products?.length}
					</Text>
				</Group>
			</Paper>
			<List />
		</Stack>
	)
}
