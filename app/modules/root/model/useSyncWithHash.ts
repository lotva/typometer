import { watchDebounced } from '@vueuse/core'

import type { TOutputFormat, TUnit } from './types'

import { useScaleStore } from './useScaleStore'

export function useSyncWithHash() {
	const store = useScaleStore()
	const router = useRouter()
	const route = useRoute()

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
			const parameters: Record<string, string> = {
				base: String(store.settings.base),
				ratio: String(store.settings.ratio),
				unit: store.settings.unit,

				steps: String(store.settings.intermediateSteps),

				snap: String(store.settings.shouldSnapToGrid),

				module: String(store.settings.gridStep),

				format: store.outputFormat,

				custom: encodeCustomSteps(store.settings.customSteps),
			}

			if (store.settings.shouldSnapToGrid === false) delete parameters.snap
			if (store.settings.shouldSnapToGrid === false) delete parameters.module
			if (store.settings.customSteps.length === 0) delete parameters.custom

			router.replace({
				hash: buildHash(parameters),
			})
		},
		{ debounce: 100 },
	)

	const restore = () => {
		const parameters = parseHash(route.hash)

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
			store.settings.customSteps = decodeCustomSteps(parameters.custom)
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

const buildHash = (parameters: Record<string, string>) => {
	const search = new URLSearchParams(parameters)
	const string = search.toString()
	return string ? `#${string}` : ''
}

const parseHash = (hash: string) => {
	const clean = hash.startsWith('#') ? hash.slice(1) : hash
	const parameters = new URLSearchParams(clean)

	return Object.fromEntries(parameters.entries())
}
