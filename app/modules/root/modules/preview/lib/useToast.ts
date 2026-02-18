/**
 * @example
 * const { isVisible, message, showToast } = useToast()
 * showToast('Copied')
 */
export function useToast() {
	const message = ref('')
	const isVisible = ref(false)
	let timeoutId: null | ReturnType<typeof setTimeout> = null

	const showToast = (updatedMessage: string) => {
		message.value = updatedMessage
		isVisible.value = true

		if (timeoutId) {
			clearTimeout(timeoutId)
			timeoutId = null
		}

		timeoutId = setTimeout(() => {
			isVisible.value = false
			timeoutId = null
		}, 2000)
	}

	return {
		isVisible,
		message,
		showToast,
	}
}
