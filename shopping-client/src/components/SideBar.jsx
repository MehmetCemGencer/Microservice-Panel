import {
	Navbar,
	Box,
	Button,
	Center,
	SegmentedControl,
	Tabs,
} from "@mantine/core"
import { IconLogout, IconBrandShopee, IconClipboardList } from "@tabler/icons"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../redux/slices/authSlice"

export default function SideBar() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)

	async function handleLogout() {
		setLoading(true)
		await dispatch(logout())
	}

	return (
		<Navbar
			p="xs"
			width={{ base: 300 }}
			sx={(theme) => ({
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[8]
						: theme.colors.gray[0],
			})}
		>
			<Navbar.Section>
				<Box
					sx={(theme) => ({
						paddingBottom: theme.spacing.lg,
						borderBottom: `1px solid ${
							theme.colorScheme === "dark"
								? theme.colors.dark[4]
								: theme.colors.gray[2]
						}`,
					})}
				>
					<Center
						style={{
							width: "100%",
							height: "100%",
						}}
						sx={(theme) => ({
							marginTop: theme.spacing.lg,
						})}
					>
						<h3 style={{ margin: 0 }}>Panel</h3>
					</Center>
				</Box>
			</Navbar.Section>
			<Navbar.Section grow mt="md">
				<Tabs
					variant="pills"
					defaultValue="store"
					orientation="vertical"
					onTabChange={(value) => navigate(`${value}`)}
					radius="md"
				>
					<Tabs.List grow sx={{ width: "100%" }} position="center">
						<Tabs.Tab
							value="store"
							sx={{ justifyContent: "center" }}
							icon={<IconBrandShopee />}
						>
							Store
						</Tabs.Tab>
						<Tabs.Tab
							value="products"
							sx={{ justifyContent: "center" }}
							icon={<IconClipboardList />}
						>
							Products
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>
			</Navbar.Section>
			<Navbar.Section>
				<Box
					sx={(theme) => ({
						paddingLeft: theme.spacing.xs,
						paddingRight: theme.spacing.xs,
						borderTop: `1px solid ${
							theme.colorScheme === "dark"
								? theme.colors.dark[4]
								: theme.colors.gray[2]
						}`,
					})}
				>
					<Center
						style={{
							marginTop: "10px",
							width: "100%",
							height: "100%",
						}}
					>
						<Button
							radius="md"
							size="xl"
							variant="subtle"
							leftIcon={<IconLogout />}
							onClick={handleLogout}
							loading={loading}
							fullWidth
						>
							Logout
						</Button>
					</Center>
				</Box>
			</Navbar.Section>
		</Navbar>
	)
}
