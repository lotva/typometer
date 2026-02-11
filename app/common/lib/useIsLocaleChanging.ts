export const useIsLocaleChanging = () => {
	const { locale, waitForPendingLocaleChange } = useI18n()

	const isLocaleChanging = ref(false)

	watch(
		locale,
		async () => {
			isLocaleChanging.value = true
			await waitForPendingLocaleChange()
			isLocaleChanging.value = false
		},
		{ flush: 'sync' },
	)

	return { isLocaleChanging }
}
