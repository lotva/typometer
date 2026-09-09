import { useMediaQuery } from '@vueuse/core'

import { useScaleStore } from '../../../model/useScaleStore'

const DESKTOP_MEDIA = '(min-width: 640px)'
const BOTTOM_THRESHOLD = 4

type TAnchor = {
	element: HTMLElement
	offset: number
}

/**
 * FLIP-style scroll stabilization: capture the first visible row before the
 * layout-affecting change (Vue `pre` flush), then re-align `scrollTop` after
 * the DOM patch but before paint (`post` flush).
 *
 * Tracks scale + settings deeply, plus an optional layout signal (e.g. RAF-synced
 * viewport width) for CSS-driven row height changes that do not rewrite `scale`.
 */
export function useScaleScrollAnchor(options: {
	layoutSignal?: MaybeRefOrGetter<unknown>
	listRef: MaybeRefOrGetter<HTMLElement | null | undefined>
	scrollContainerRef: MaybeRefOrGetter<HTMLElement | null | undefined>
}) {
	const store = useScaleStore()
	const isDesktop = useMediaQuery(DESKTOP_MEDIA)

	let anchor: null | TAnchor = null
	let stickToBottom = false

	function getScrollRoot(): HTMLElement | null {
		if (isDesktop.value) {
			return toValue(options.scrollContainerRef) ?? null
		}

		return document.scrollingElement as HTMLElement | null
	}

	function getPortTop(root: HTMLElement) {
		if (root === document.scrollingElement) return 0

		return root.getBoundingClientRect().top + root.clientTop
	}

	function captureAnchor() {
		const root = getScrollRoot()
		const list = toValue(options.listRef)

		if (!root || !list) {
			anchor = null
			stickToBottom = false
			return
		}

		stickToBottom =
			root.scrollHeight - root.scrollTop - root.clientHeight <= BOTTOM_THRESHOLD

		if (stickToBottom) {
			anchor = null
			return
		}

		const portTop = getPortTop(root)
		anchor = null

		for (const child of list.children) {
			const element = child as HTMLElement
			const offset = element.getBoundingClientRect().top - portTop

			if (offset >= -1) {
				anchor = { element, offset }
				break
			}
		}
	}

	function restoreAnchor() {
		const root = getScrollRoot()
		if (!root) return

		if (stickToBottom) {
			root.scrollTop = root.scrollHeight
			return
		}

		if (!anchor || !anchor.element.isConnected) return

		const portTop = getPortTop(root)
		const offset = anchor.element.getBoundingClientRect().top - portTop
		root.scrollTop += offset - anchor.offset
	}

	const layoutSources = [
		() => store.scale,
		store.settings,
		() => toValue(options.layoutSignal),
	] as const

	watch(layoutSources, captureAnchor, { deep: true, flush: 'pre' })
	watch(layoutSources, restoreAnchor, { deep: true, flush: 'post' })
}
