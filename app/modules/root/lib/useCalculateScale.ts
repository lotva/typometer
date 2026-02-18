import type { ISettings } from '../model/types'

import {
	generateRawScale,
	mergeScaleWithCustomSteps,
	round,
	snapToGrid,
} from './scale.utilities'

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
			toValue(settings).customSteps,
			toValue(settings),
		)

		return points.map((p) => p.value)
	})

	return {
		mergedScale,
		rawScale,
		roundedScale,
		snappedScale,
	}
}
