import { defineVitestProject } from '@nuxt/test-utils/config'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		projects: [
			await defineVitestProject({
				test: {
					environment: 'nuxt',
					include: ['layers/**/*.spec.ts'],
					name: 'runtime',
				},
			}),

			await defineVitestProject({
				test: {
					browser: {
						enabled: true,
						instances: [{ browser: 'chromium' }],
						provider: playwright(),
					},
					environment: 'nuxt',
					include: ['layers/**/*.spec.browser.ts'],
					name: 'browser',
					setupFiles: ['vitest-browser-vue'],
				},
			}),

			{
				test: {
					environment: 'node',
					include: ['layers/**/*.spec.e2e.ts'],
					name: 'e2e',
				},
			},
		],
	},
})
