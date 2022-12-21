import {
	TextInput,
	PasswordInput,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Button,
	Center,
} from "@mantine/core"
import * as Yup from "yup"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm, yupResolver } from "@mantine/form"
import { login } from "../../redux/slices/authSlice"
import { Link } from "react-router-dom"

export default function Login() {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	const schema = Yup.object({
		email: Yup.string().email("Invalid email address").required("Required"),
		password: Yup.string()
			.min(6, "Password must be longer than 5 characters")
			.required("Required"),
	})

	const form = useForm({
		validate: yupResolver(schema),
		initialValues: {
			email: "",
			password: "",
		},
	})

	async function handleSubmit(values, e) {
		try {
			e.preventDefault()
			setLoading(true)
			const { error } = await dispatch(login({ ...values }))

			if (error) setLoading(false)
		} catch (e) {}
	}

	return (
		<Center style={{ width: "100vw", height: "100vh" }}>
			<Container size={420} my={40}>
				<Title
					align="center"
					sx={(theme) => ({
						fontWeight: 900,
						fontSize: "50px",
					})}
				>
					Microservice Panel
				</Title>
				<Text color="dimmed" size="lg" align="center" mt={5}>
					Do not have an account yet?{" "}
					<Anchor component={Link} to="/register" size="lg">
						Create account
					</Anchor>
				</Text>

				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput
							size="xl"
							label="Email"
							placeholder="you@mantine.dev"
							required
							{...form.getInputProps("email")}
						/>
						<PasswordInput
							size="xl"
							label="Password"
							placeholder="Your password"
							required
							mt="md"
							{...form.getInputProps("password")}
						/>
						<Button
							type="submit"
							fullWidth
							size="lg"
							mt="xl"
							loading={loading}
						>
							Sign in
						</Button>
					</form>
				</Paper>
			</Container>
		</Center>
	)
}
