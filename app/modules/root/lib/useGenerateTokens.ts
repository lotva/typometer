import { type ISettings, type TOutputFormat } from '../model/types'
import { generateCss } from './css.utilities'
import { generateTokens } from './tokens.utilities'

export function useGenerateTokens(
	scaleValues: MaybeRefOrGetter<number[]>,
	unit: MaybeRefOrGetter<ISettings['unit']>,
	outputFormat: MaybeRefOrGetter<TOutputFormat>,
	baseIndex: MaybeRefOrGetter<number>,
	disabledIndices: MaybeRefOrGetter<Set<number>>,
) {
	const tokens = computed(() =>
		generateTokens(
			toValue(scaleValues),
			toValue(unit),
			toValue(outputFormat),
			toValue(baseIndex),
			toValue(disabledIndices),
		),
	)

	const css = computed(() => generateCss(tokens.value))

	return {
		css,
		tokens,
	}
}
