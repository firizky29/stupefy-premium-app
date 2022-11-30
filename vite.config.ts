import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import EnvironmentPlugin from 'vite-plugin-environment'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: path.join(__dirname, "build"),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: path.join(__dirname, "index.html"),
			},
		},
	},
	server: {
		port: 3000,
		hmr: {
			protocol: 'ws',
			port: 3001,
		},
		watch: {
			usePolling: true
		}
	},
	plugins: [react(), viteTsconfigPaths(), svgrPlugin(), EnvironmentPlugin('all')],
});


