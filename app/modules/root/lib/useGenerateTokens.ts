import { type ISettings, type TOutputFormat } from '../model/types'
import { generateTokens } from './tokens'
import { generateCss } from './utilities'

export function useGenerateTokens(
	scaleValues: MaybeRefOrGetter<number[]>,
	unit: MaybeRefOrGetter<ISettings['unit']>,
	outputFormat: MaybeRefOrGetter<TOutputFormat>,
	baseIndex: MaybeRefOrGetter<number>,
) {
	const tokens = computed(() =>
		generateTokens(
			toValue(scaleValues),
			toValue(unit),
			toValue(outputFormat),
			toValue(baseIndex),
		),
	)

	const css = computed(() => generateCss(tokens.value))

	return {
		css,
		tokens,
	}
}
