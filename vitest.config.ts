import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		projects: [
			await defineVitestProject({
				test: {
					environment: 'nuxt',
					include: ['app/**/*.spec.ts'],
					name: 'runtime',
				},
			}),
		],
	},
})
