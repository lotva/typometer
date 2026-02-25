import type { RouterConfig } from '@nuxt/schema'

export const scrollPositions = new Map<string, number>()

const HEADER_HEIGHT = 56

export default {
	async scrollBehavior(to, from, savedPosition) {
		const nuxtApp = useNuxtApp()

		if (nuxtApp.$i18n && to.name !== from.name) {
			await nuxtApp.$i18n.waitForPendingLocaleChange()

			return {
				left: window.scrollX,
				top: window.scrollY,
			}
		}

		if (savedPosition) {
			return savedPosition
		}

		if (window.scrollY < 5) {
			return { top: 0 }
		}

		const tab = to.query.tab as string

		if (scrollPositions.has(tab)) {
			await new Promise(requestAnimationFrame)

			if (scrollPositions.get(tab)! < 5) {
				return { top: HEADER_HEIGHT }
			}

			return {
				top: scrollPositions.get(tab),
			}
		}

		return { top: HEADER_HEIGHT }
	},
} as RouterConfig
