import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
	const config = {
		plugins: [react()],
	};
	return config;
});
