export const useLocaleTransition = () => {
	const { locale, waitForPendingLocaleChange } = useI18n()

	watch(locale, async () => {
		document.documentElement.classList.add('is-locale-changing')

		await new Promise(requestAnimationFrame)
		await waitForPendingLocaleChange()
		await new Promise(requestAnimationFrame)

		document.documentElement.classList.remove('is-locale-changing')
	})
}
