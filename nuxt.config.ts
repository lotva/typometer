export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',

	css: ['~~/app/core/assets/styles/index.css'],

	devtools: { enabled: false },

	dir: {
		assets: '~~/app/core/assets',
		layouts: '~~/app/core/layouts',
		plugins: '~~/app/core/plugins',
	},

	eslint: {
		config: {
			standalone: false,
		},
	},
	experimental: {
		typedPages: true,
	},

	i18n: {
		defaultLocale: 'en',
		detectBrowserLanguage: false,
		locales: [
			{
				code: 'en',
				file: 'en.ts',
			},
			{
				code: 'ru',
				file: 'ru.ts',
			},
		],
		restructureDir: 'app/core/i18n',
	},

	imports: {
		scan: false,
	},

	modules: [
		'@nuxt/eslint',
		'@nuxt/test-utils',
		'@nuxt/devtools',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'motion-v/nuxt',
	],

	postcss: {
		plugins: {
			'@csstools/postcss-global-data': {
				files: ['app/core/assets/styles/globals/breakpoints.pcss'],
			},
			'postcss-custom-media': {},
		},
	},

	typescript: {
		tsConfig: {
			include: ['../commitlint.config.ts'],
		},
	},
})
