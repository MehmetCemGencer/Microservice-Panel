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
import { register } from "../../redux/slices/authSlice"
import { Link, useNavigate } from "react-router-dom"
import { showNotification } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons"

export default function Register() {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const schema = Yup.object({
		username: Yup.string()
			.min(2, "Username is too short")
			.required("Required"),
		email: Yup.string().email("Invalid email address").required("Required"),
		password: Yup.string()
			.min(6, "Password must be longer than 5 characters")
			.required("Required"),
		confirmPassword: Yup.string()
			.min(6, "Password must be longer than 5 characters")
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Required"),
	})

	const form = useForm({
		validate: yupResolver(schema),
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	async function handleSubmit(values, e) {
		try {
			e.preventDefault()
			setLoading(true)
			const { error } = await dispatch(register({ ...values }))

			if (error) return setLoading(false)

			showNotification({
				message: "User created. Please login.",
				icon: <IconCheck />,
				autoClose: 10000,
			})
			navigate("/")
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
					Already have an account?{" "}
					<Anchor component={Link} to="/" size="lg">
						Login
					</Anchor>
				</Text>

				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput
							size="xl"
							label="Username"
							placeholder="Admin"
							required
							{...form.getInputProps("username")}
						/>
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
						<PasswordInput
							size="xl"
							label="Confirm Password"
							placeholder="Your password"
							required
							mt="md"
							{...form.getInputProps("confirmPassword")}
						/>
						<Button
							type="submit"
							fullWidth
							size="lg"
							mt="xl"
							loading={loading}
						>
							Sign up
						</Button>
					</form>
				</Paper>
			</Container>
		</Center>
	)
}
