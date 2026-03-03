import type { ISettings } from '../model/types'

import {
	generateRawScale,
	mergeScaleWithCustomSteps,
	round,
	snapToGrid,
} from './scale'

export function useCalculateScale(settings: MaybeRefOrGetter<ISettings>) {
	const rawScale = computed(() => generateRawScale(toValue(settings)))

	const roundedScale = computed(() =>
		rawScale.value.map((point) => ({
			exponent: point.exponent,
			value: round(point.value, toValue(settings).unit),
		})),
	)

	const snappedScale = computed(() => {
		if (!toValue(settings).shouldSnapToGrid) return roundedScale.value

		return roundedScale.value
			.map((point) => ({
				exponent: point.exponent,
				value: snapToGrid(point.value, toValue(settings)),
			}))
			.filter((point, index, array) => point.value !== array[index + 1]?.value)
	})

	const mergedScale = computed(() => {
		const points = mergeScaleWithCustomSteps(
			snappedScale.value,
			toValue(settings),
		)

		const values = points.map((p) => p.value)
		return [...new Set(values)]
	})

	return {
		mergedScale,
		rawScale,
		roundedScale,
		snappedScale,
	}
}
