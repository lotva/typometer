export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',

	css: ['~~/app/core/assets/styles/index.css'],

	devtools: { enabled: true },

	eslint: {
		config: {
			standalone: false,
		},
	},
	experimental: {
		typedPages: true,
	},

	imports: {
		scan: false,
	},

	modules: ['@nuxt/eslint', '@nuxt/test-utils', '@nuxt/devtools'],

	typescript: {
		tsConfig: {
			include: ['../commitlint.config.ts'],
		},
	},
})
