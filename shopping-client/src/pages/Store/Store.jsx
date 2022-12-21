import { Stack } from "@mantine/core"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getStore } from "../../redux/slices/storeSlice"
import StoreLogo from "./StoreLogo"
import StoreName from "./StoreName"

export default function Store() {
	const dispatch = useDispatch()

	useEffect(() => {
		const cancelToken = axios.CancelToken.source()

		;(async () => {
			await dispatch(getStore(cancelToken.token))
		})()

		return () => {
			cancelToken.cancel()
		}
	}, [])

	return (
		<Stack spacing="xl">
			<StoreName />
			<StoreLogo />
		</Stack>
	)
}
