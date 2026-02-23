export default defineNuxtConfig({
	app: {
		head: {
			link: [
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
		typedPages: true,
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
		'motion-v/nuxt',
		'@vite-pwa/nuxt',
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
		experimental: {
			enableWorkboxPayloadQueryParams: true,
		},
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
			runtimeCaching: [
				{
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'payload-cache',
						expiration: {
							maxAgeSeconds: 7 * 24 * 60 * 60,
							maxEntries: 10,
						},
					},
					urlPattern: /^\/_payload\.json(\?.*)?$/,
				},
			],
		},
	},

	typescript: {
		tsConfig: {
			include: ['../commitlint.config.ts'],
		},
	},
})
