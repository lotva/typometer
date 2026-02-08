import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
	const scrollPositions = new Map<string, { left: number; top: number }>()

	const saveScrollPositions = () => {
		const elements = document.querySelectorAll('[data-save-scroll]')

		elements.forEach((element_, index) => {
			const element = element_ as HTMLElement
			const key =
				element.dataset.saveScrollKey || element.id || `element-${index}`

			scrollPositions.set(key, {
				left: element.scrollLeft,
				top: element.scrollTop,
			})
		})
	}

	const restoreScrollPositions = () => {
		const elements = document.querySelectorAll('[data-save-scroll]')

		elements.forEach((element_, index) => {
			const element = element_ as HTMLElement
			const key =
				element.dataset.saveScrollKey || element.id || `element-${index}`
			const position = scrollPositions.get(key)

			if (position) {
				element.scrollLeft = position.left
				element.scrollTop = position.top
			}
		})
	}

	nuxtApp.hook('i18n:beforeLocaleSwitch', () => {
		saveScrollPositions()
	})

	nuxtApp.hook('i18n:localeSwitched', async () => {
		await nextTick()
		restoreScrollPositions()
	})

	nuxtApp.vueApp.directive('save-scroll', {
		mounted(element, binding) {
			element.setAttribute('data-save-scroll', '')

			if (typeof binding.value === 'string') {
				element.setAttribute('data-save-scroll-key', binding.value)
			} else if (element.id) {
				element.setAttribute('data-save-scroll-key', element.id)
			}
		},

		unmounted(element) {
			element.removeAttribute('data-save-scroll')
			element.removeAttribute('data-save-scroll-key')
		},
	})
})
