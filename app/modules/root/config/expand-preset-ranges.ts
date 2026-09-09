import type { IPreset, ISettings } from '../model/types'

const DEFAULT_VIEWPORT_MIN = 360
const DEFAULT_VIEWPORT_MAX = 1440

const RATIO_MIN_SPAN_FACTOR = 0.3

const MUSICAL_SCALES = [
	1.067, // Minor Second
	1.125, // Major Second
	1.2, // Minor Third
	1.25, // Major Third
	1.333, // Perfect Fourth
	1.414, // Augmented Fourth
	1.5, // Perfect Fifth
	1.667, // Major Sixth
	1.778, // Minor Seventh
	1.875, // Major Seventh
	2, // Octave
] as const

export function expandPresetRanges(
	preset: Pick<IPreset, 'baseMax' | 'baseMin' | 'ratioMax' | 'ratioMin'>,
): Pick<
	ISettings,
	| 'baseMax'
	| 'baseMin'
	| 'ratioMax'
	| 'ratioMin'
	| 'viewportMax'
	| 'viewportMin'
> {
	const { baseMax, baseMin, ratioMax, ratioMin: explicitRatioMin } = preset
	const ratioMin =
		explicitRatioMin ??
		findClosestMusicalScale(ratioMax - (ratioMax - 1) * RATIO_MIN_SPAN_FACTOR)

	return {
		baseMax,
		baseMin,
		ratioMax,
		ratioMin,
		viewportMax: DEFAULT_VIEWPORT_MAX,
		viewportMin: DEFAULT_VIEWPORT_MIN,
	}
}

function findClosestMusicalScale(value: number): number {
	return MUSICAL_SCALES.reduce((previous, current) =>
		Math.abs(current - value) < Math.abs(previous - value) ? current : previous,
	)
}
