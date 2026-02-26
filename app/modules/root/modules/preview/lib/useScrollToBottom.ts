export function useScrollToBottom(
	elementRef: Ref<null | { $el: HTMLElement }>,
) {
	const DESKTOP_BREAKPOINT = 640
	const SCROLL_THRESHOLD = 5

	function scrollDesktopElementToBottom(element: HTMLElement) {
		const scrollPosition = element.clientHeight + element.scrollTop
		const isAtBottom =
			Math.abs(element.scrollHeight - scrollPosition) < SCROLL_THRESHOLD

		if (isAtBottom) {
			nextTick(() => {
				element.scrollTop = element.scrollHeight
			})
		}
	}

	function scrollMobilePageToBottom() {
		const distanceToBottom =
			document.body.scrollHeight - (window.scrollY + window.innerHeight)
		const isAtBottom = Math.abs(distanceToBottom) < SCROLL_THRESHOLD

		if (isAtBottom) {
			nextTick(() => {
				window.scrollTo({ top: document.body.scrollHeight })
			})
		}
	}

	function handleScrollToBottom() {
		if (!elementRef.value) return

		const element = elementRef.value.$el
		const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT

		if (isDesktop) {
			scrollDesktopElementToBottom(element)
		} else {
			scrollMobilePageToBottom()
		}
	}

	return {
		handleScrollToBottom,
	}
}
