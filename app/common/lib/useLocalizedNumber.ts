import { toIntlLocale } from './toIntlLocale'

export const NUMBER_FORMAT_OPTIONS = {
	maximumFractionDigits: 3,
	useGrouping: false,
} as const

export function useLocalizedNumber(number: MaybeRefOrGetter<number>) {
	const { locale } = useI18n()

	return computed(() =>
		toValue(number).toLocaleString(
			toIntlLocale(locale.value),
			NUMBER_FORMAT_OPTIONS,
		),
	)
}
