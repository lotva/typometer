export function useLocalizedNumber(number: MaybeRefOrGetter<number>) {
	const { locale } = useI18n()

	return computed(() => toValue(number).toLocaleString(locale.value))
}
