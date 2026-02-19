import { onKeyStroke } from '@vueuse/core'

export function useFocusHotkey(
	targetRef: Ref<HTMLElement | undefined | { $el: HTMLElement }>,
	hotkey: string,
) {
	onKeyStroke(
		(e) => e.code.replace('Key', '') === hotkey,
		() => {
			getElement(targetRef.value)?.focus()
		},
		{ dedupe: true },
	)
}

/**
 * Gets the actual DOM element from a ref that might be an Ark UI component with `$el`
 */
const getElement = (ref: HTMLElement | undefined | { $el: HTMLElement }) => {
	if (!ref) return undefined
	if ('$el' in ref) return ref.$el

	return ref
}
