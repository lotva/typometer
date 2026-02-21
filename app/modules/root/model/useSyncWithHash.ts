import { useUrlSearchParams, watchDebounced } from '@vueuse/core'

import type { TOutputFormat, TUnit } from './types'

import { useScaleStore } from './useScaleStore'

export function useSyncWithHash() {
	const store = useScaleStore()
	const parameters = useUrlSearchParams('hash')

	watchDebounced(
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
		{ debounce: 100 },
	)

	const restore = () => {
		if (parameters.unit) {
			store.updateSettings({ unit: parameters.unit as TUnit })
		}
		if (parameters.base) {
			store.updateBase(Number(parameters.base), store.settings.unit)
		}
		if (parameters.ratio) {
			store.updateSettings({ ratio: Number(parameters.ratio) })
		}
		if (parameters.steps) {
			store.updateIntermediateSteps(Number(parameters.steps))
		}
		if (parameters.snap) {
			store.updateSettings({
				shouldSnapToGrid: parameters.snap === 'true',
			})
		}
		if (parameters.module) {
			store.updateGridStep(Number(parameters.module), store.settings.unit)
		}
		if (parameters.format) {
			store.outputFormat = parameters.format as TOutputFormat
		}
		if (parameters.custom) {
			store.settings.customSteps = decodeCustomSteps(
				parameters.custom as string,
			)
		}
	}

	onMounted(() => restore())
}

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

const decodeCustomSteps = (encoded: string) => {
	try {
		const parsed = JSON.parse(atob(encoded))
		return Array.isArray(parsed) &&
			parsed.every((item) => item.offsetExponent !== undefined)
			? parsed
			: []
	} catch {
		return []
	}
}
