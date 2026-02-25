import type { TPreviewMode } from '~/modules/root/model/types'

const scrollPositions = new Map<TPreviewMode, number>()
const HEADER_HEIGHT = 56

export const usePreviewMode = () => {
	const previewMode = ref<TPreviewMode>('scale')

	watch(
		previewMode,
		async (_, previousMode) => {
			scrollPositions.set(previousMode, window.scrollY)
		},
		{ flush: 'pre' },
	)

	watch(
		previewMode,
		async (currentMode) => {
			if (window.scrollY < 5) {
				window.scrollTo({ top: 0 })
				return
			}

			if (scrollPositions.has(currentMode)) {
				await nextTick()
				await new Promise(requestAnimationFrame)

				if (scrollPositions.get(currentMode)! < 5) {
					window.scrollTo({ top: HEADER_HEIGHT })
					return
				}

				window.scrollTo({ top: scrollPositions.get(currentMode) })
				return
			}

			window.scrollTo({ top: HEADER_HEIGHT })
		},
		{ flush: 'post' },
	)

	return {
		previewMode,
	}
}
