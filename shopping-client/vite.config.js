import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		watch: {
			// bind volumes don't get fs events
			// so we need to poll now.
			usePolling: true,
		},
	},
})
