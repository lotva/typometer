import type { ISettings } from '../model/types'

import { generateRawScale, round, snapToGrid } from './utilities'

export function useCalculateScale(settings: MaybeRefOrGetter<ISettings>) {
	const rawScale = computed(() => generateRawScale(toValue(settings)))

	const roundedScale = computed(() =>
		rawScale.value.map((value) => round(value, toValue(settings).unit)),
	)

	const snappedScale = computed(() => {
		if (!toValue(settings).shouldSnapToGrid) return roundedScale.value

		return roundedScale.value
			.map((value) => snapToGrid(value, toValue(settings)))
			.filter((value, index, array) => value !== array[index + 1])
	})

	return {
		rawScale,
		roundedScale,
		snappedScale,
	}
}
