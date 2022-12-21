import { useSelector } from "react-redux"
import { Grid } from "@mantine/core"
import CarouselCard from "./CarouselCard"

export default function List() {
	const { products } = useSelector((state) => state.product)

	return (
		<Grid justify="start" align="center">
			{products?.map((item) => (
				<Grid.Col key={item.id} span={4}>
					<CarouselCard product={item} />
				</Grid.Col>
			))}
		</Grid>
	)
}
