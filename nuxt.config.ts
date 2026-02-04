export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',

	css: ['~~/app/core/assets/styles/index.css'],

	devtools: { enabled: false },

	dir: {
		layouts: '~~/app/core/layouts',
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
		skipSettingLocaleOnNavigate: true,
	},

	imports: {
		scan: false,
	},

	modules: [
		'@nuxt/eslint',
		'@nuxt/test-utils',
		'@nuxt/devtools',
		'@nuxtjs/i18n',
		'motion-v/nuxt',
	],

	typescript: {
		tsConfig: {
			include: ['../commitlint.config.ts'],
		},
	},
})
