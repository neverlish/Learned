import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	test: {
		globals: true,
	 environment: 'node',
		setupFiles: ['./__tests__/setup.ts'],
		include: ['**/__tests__/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['lib/**/*.ts', 'app/api/**/*.ts'],
			exclude: ['node_modules/', '.next/', '__tests__/'],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './'),
		},
	},
});
