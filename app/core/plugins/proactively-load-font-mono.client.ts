const MONOSPACE_FONT_FAMILY = 'Martian Mono'

export default defineNuxtPlugin(() => {
	const loadMonospace = () => {
		const fontFaces = Array.from(document.fonts)
		const monospace = fontFaces.find((f) => f.family === MONOSPACE_FONT_FAMILY)

		if (monospace?.status !== 'loaded') {
			monospace?.load()
		}
	}

	if ('requestIdleCallback' in window) {
		requestIdleCallback(loadMonospace)
	}
})
