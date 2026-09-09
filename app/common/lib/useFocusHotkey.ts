import type { Ref } from 'vue'

import { onKeyStroke } from '@vueuse/core'
import { readonly, shallowRef } from 'vue'

export function useFocusHotkey(
	targetRef: Ref<HTMLElement | undefined | { $el: HTMLElement }>,
	hotkey: string,
) {
	const isPressed = shallowRef(false)

	onKeyStroke(
		(event) => matchesHotkey(event, hotkey),
		(event) => {
			event.preventDefault()
			isPressed.value = true
			getElement(targetRef.value)?.focus()
		},
		{ dedupe: true },
	)

	onKeyStroke(
		(event) => matchesHotkey(event, hotkey),
		() => {
			isPressed.value = false
		},
		{ eventName: 'keyup' },
	)

	return readonly(isPressed)
}

/**
 * Gets the actual DOM element from a ref that might be an Ark UI component with `$el`
 */
const getElement = (ref: HTMLElement | undefined | { $el: HTMLElement }) => {
	if (!ref) return undefined
	if ('$el' in ref) return ref.$el

	return ref
}

function matchesHotkey(event: KeyboardEvent, hotkey: string) {
	if (
		event.isComposing ||
		event.altKey ||
		event.ctrlKey ||
		event.metaKey ||
		event.shiftKey
	) {
		return false
	}

	return event.code.replace(/^Key/, '').toLowerCase() === hotkey.toLowerCase()
}
