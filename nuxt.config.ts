export default defineNuxtConfig({
	app: {
		head: {
			link: [
				{
					as: 'font',
					crossorigin: 'anonymous',
					href: '/fonts/pt-root-ui-vf.woff2',
					rel: 'preload',
					tagPriority: -1,
					type: 'font/woff2',
				},
				{
					href: '/favicon.ico',
					rel: 'icon',
					sizes: '48x48',
					type: 'image/x-icon',
				},
				{ href: '/icon-any.svg', rel: 'icon', type: 'image/svg+xml' },
				{
					href: '/icon-180.png',
					rel: 'apple-touch-icon',
				},
			],
		},
	},

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
		payloadExtraction: false,
		typedPages: true,
	},

	features: {
		inlineStyles: true,
	},

	i18n: {
		defaultLocale: 'en',
		detectBrowserLanguage: false,
		locales: [
			{
				code: 'en',
				file: 'en.ts',
				language: 'en-US',
			},
			{
				code: 'ru',
				file: 'ru.ts',
				language: 'ru-RU',
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
		'@vite-pwa/nuxt',
		'nuxt-vitalizer',
	],

	postcss: {
		plugins: {
			'@csstools/postcss-global-data': {
				files: ['app/core/assets/styles/globals/breakpoints.pcss'],
			},
			'postcss-custom-media': {},
		},
	},

	pwa: {
		disable: process.env.NODE_ENV !== 'production',
		manifest: {
			description: 'Compose typographic scale as CSS tokens',
			icons: [
				{
					sizes: '192x192',
					src: 'icon-192.png',
					type: 'image/png',
				},
				{
					purpose: 'maskable',
					sizes: '512x512',
					src: 'icon-512-maskable.png',
					type: 'image/png',
				},
				{
					sizes: '512x512',
					src: 'icon-512.png',
					type: 'image/png',
				},
			],
			name: 'Typometer',
			short_name: 'Typometer',
			theme_color: '#0a0a0a',
		},
		registerType: 'autoUpdate',
		workbox: {
			globIgnores: ['manifest**.webmanifest'],
			globPatterns: ['**/*.{js,json,css,html,txt,svg,png,ico,webp,woff2,wasm}'],
		},
	},

	typescript: {
		tsConfig: {
			include: ['../commitlint.config.ts'],
		},
	},

	vitalizer: {
		disableStylesheets: true,
	},

	vite: {
		build: {
			cssCodeSplit: false,
		},
	},
})
