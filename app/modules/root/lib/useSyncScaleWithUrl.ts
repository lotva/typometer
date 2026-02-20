import { useUrlSearchParams } from '@vueuse/core'

import { useScaleStore } from '../model/useScaleStore'

export function useSyncScaleWithUrl() {
	const store = useScaleStore()
	const parameters = useUrlSearchParams('history')

	const encodeCustomSteps = (steps: any[]) => {
		if (!steps?.length) return ''

		return btoa(
			JSON.stringify(
				steps.map(({ offsetExponent, position, referenceIndex }) => ({
					offsetExponent,
					position,
					referenceIndex,
				})),
			),
		)
	}

	watch(
		() => [
			store.settings.base,
			store.settings.ratio,
			store.settings.intermediateSteps,
			store.settings.unit,
			store.settings.shouldSnapToGrid,
			store.settings.gridStep,
			store.settings.customSteps,
			store.outputFormat,
		],
		() => {
			parameters.base = String(store.settings.base)
			parameters.ratio = String(store.settings.ratio)
			parameters.steps = String(store.settings.intermediateSteps)
			parameters.unit = store.settings.unit
			parameters.snap = String(store.settings.shouldSnapToGrid)
			parameters.module = String(store.settings.gridStep)

			parameters.custom = encodeCustomSteps(store.settings.customSteps)

			parameters.format = store.outputFormat
		},
	)

	return { parameters }
}
