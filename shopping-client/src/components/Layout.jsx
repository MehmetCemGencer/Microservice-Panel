import { AppShell } from "@mantine/core"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

export default function Layout() {
	const { isAuthenticated } = useSelector((state) => state.auth)

	return (
		<>
			<AppShell
				navbar={<SideBar />}
				hidden={isAuthenticated ? false : true}
			>
				<Outlet />
			</AppShell>
		</>
	)
}
