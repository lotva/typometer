import { watchDebounced } from '@vueuse/core'

import type { TOutputFormat } from './types'

import { useScaleStore } from './useScaleStore'

const DEFAULT_OUTPUT_FORMAT: TOutputFormat = 'semantic'

export function useSyncWithHash() {
	const store = useScaleStore()
	const router = useRouter()
	const route = useRoute()

	watchDebounced(
		() => [
			store.settings.baseMin,
			store.settings.baseMax,
			store.settings.ratioMin,
			store.settings.ratioMax,
			store.settings.viewportMin,
			store.settings.viewportMax,
			store.settings.intermediateSteps,
			store.settings.shouldSnapToGrid,
			store.settings.gridStep,
			store.outputFormat,
		],
		() => {
			const parameters: Record<string, string> = {
				base: encodeRange(store.settings.baseMin, store.settings.baseMax),
				ratio: encodeRange(store.settings.ratioMin, store.settings.ratioMax),
				steps: String(store.settings.intermediateSteps),
				vw: encodeRange(store.settings.viewportMin, store.settings.viewportMax),
			}

			if (store.settings.shouldSnapToGrid) {
				parameters.snap = 'true'
				parameters.module = String(store.settings.gridStep)
			}

			if (store.outputFormat !== DEFAULT_OUTPUT_FORMAT) {
				parameters.format = store.outputFormat
			}

			router.replace({
				hash: buildHash(parameters),
			})
		},
		{ debounce: 100 },
	)

	const restore = () => {
		const parameters = parseHash(route.hash)

		const base = decodeRange(parameters.base)
		if (base) store.updateBaseRange(base)

		const ratio = decodeRange(parameters.ratio)
		if (ratio) store.updateRatioRange(ratio)

		const viewport = decodeRange(parameters.vw)
		if (viewport) store.updateViewportRange(viewport)

		if (parameters.steps) {
			store.updateIntermediateSteps(Number(parameters.steps))
		}

		if (parameters.snap) {
			store.updateSettings({
				shouldSnapToGrid: parameters.snap === 'true',
			})
		}

		if (parameters.module) {
			store.updateGridStep(Number(parameters.module))
		}

		if (parameters.format) {
			const format = parseOutputFormat(parameters.format)
			if (format) store.outputFormat = format
		}
	}

	onMounted(() => restore())
}

function decodeRange(value: string | undefined): [number, number] | null {
	if (!value) return null

	const parts = value.split(',').map(Number)
	const min = parts[0]
	const max = parts.length === 1 ? parts[0] : parts[1]

	if (min === undefined || max === undefined) return null
	if (!Number.isFinite(min) || !Number.isFinite(max)) return null

	return [min, max]
}

function encodeHashComponent(value: string) {
	return encodeURIComponent(value).replaceAll('%2C', ',')
}

function encodeRange(min: number, max: number) {
	return min === max ? String(min) : `${min},${max}`
}

function parseOutputFormat(value: string): null | TOutputFormat {
	if (value === 'numeric' || value === 'semantic' || value === 'tshirt') {
		return value
	}

	return null
}

const buildHash = (parameters: Record<string, string>) => {
	const string = Object.entries(parameters)
		.map(
			([key, value]) =>
				`${encodeHashComponent(key)}=${encodeHashComponent(value)}`,
		)
		.join('&')

	return string ? `#${string}` : ''
}

const parseHash = (hash: string) => {
	const clean = hash.startsWith('#') ? hash.slice(1) : hash
	if (!clean) return {}

	return Object.fromEntries(
		clean.split('&').flatMap((pair) => {
			const [rawKey, ...rest] = pair.split('=')
			if (!rawKey) return []

			try {
				return [
					[decodeURIComponent(rawKey), decodeURIComponent(rest.join('='))],
				]
			} catch {
				return []
			}
		}),
	)
}
