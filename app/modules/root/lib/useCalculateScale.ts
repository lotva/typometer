import type { IScalePoint, ISettings } from '../model/types'

import { generateRawScale, snapValue } from './scale'

export function useCalculateScale(settings: MaybeRefOrGetter<ISettings>) {
	const scale = computed((): IScalePoint[] => {
		const current = toValue(settings)
		const seen = new Set<number>()

		return generateRawScale(current)
			.map((point) => {
				const value =
					current.shouldSnapToGrid && point.exponent >= 0
						? snapValue(point.value, current.gridStep)
						: Math.round(point.value)

				return {
					exponent: point.exponent,
					value,
				}
			})
			.filter((point) => {
				if (seen.has(point.value)) return false
				seen.add(point.value)
				return true
			})
	})

	return { scale }
}
