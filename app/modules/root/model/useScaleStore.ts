import type { ISettings, TOutputFormat } from './types'

import { expandPresetRanges } from '../config/expand-preset-ranges'
import { PRESETS } from '../config/presets'
import {
	BASE_BOUNDS,
	clampRange,
	GRID_STEP_BOUNDS,
	RATIO_BOUNDS,
	STEPS_BOUNDS,
	VIEWPORT_BOUNDS,
} from '../config/setting-bounds'
import { clamp } from '../lib/scale'
import { useCalculateScale } from '../lib/useCalculateScale'
import { generateTokens } from '../modules/tokens'

const DEFAULT_RANGES = expandPresetRanges({
	baseMax: 21,
	baseMin: 18,
	ratioMax: 1.5,
})

export const useScaleStore = defineStore('scale', () => {
	const settings = reactive<ISettings>({
		...DEFAULT_RANGES,
		gridStep: 4,
		intermediateSteps: 2,
		shouldSnapToGrid: false,
	})

	const outputFormat = ref<TOutputFormat>('semantic')
	const activePresetId = ref<null | string>(null)

	const currentViewportWidth = ref(
		(settings.viewportMin + settings.viewportMax) / 2,
	)

	function clampCurrentViewportWidth() {
		currentViewportWidth.value = clamp(
			currentViewportWidth.value,
			settings.viewportMin,
			settings.viewportMax,
		)
	}

	function applyPreset(presetId: string) {
		const preset = PRESETS.find((p) => p.id === presetId)

		if (!preset) return

		const ranges = expandPresetRanges(preset)

		updateBaseRange([ranges.baseMin, ranges.baseMax])
		updateRatioRange([ranges.ratioMin, ranges.ratioMax])
		updateViewportRange([ranges.viewportMin, ranges.viewportMax])
		updateGridStep(preset.gridStep)
		settings.intermediateSteps = clamp(
			preset.intermediateSteps,
			STEPS_BOUNDS.min,
			STEPS_BOUNDS.max,
		)
		settings.shouldSnapToGrid = preset.shouldSnapToGrid
		activePresetId.value = presetId
	}

	function updateSettings(updated: Partial<ISettings>) {
		Object.assign(settings, updated)
		clampCurrentViewportWidth()
	}

	function updateBaseRange(range: [number, number]) {
		const [min, max] = clampRange(range, BASE_BOUNDS)
		settings.baseMin = min
		settings.baseMax = max
	}

	function updateRatioRange(range: [number, number]) {
		const [min, max] = clampRange(range, RATIO_BOUNDS)
		settings.ratioMin = min
		settings.ratioMax = max
	}

	function updateViewportRange(range: [number, number]) {
		const [min, max] = clampRange(range, VIEWPORT_BOUNDS)
		settings.viewportMin = min
		settings.viewportMax = max
		clampCurrentViewportWidth()
	}

	function updateGridStep(value: number) {
		settings.gridStep = clamp(value, GRID_STEP_BOUNDS.min, GRID_STEP_BOUNDS.max)
	}

	function updateIntermediateSteps(steps: number) {
		settings.intermediateSteps = clamp(
			steps,
			STEPS_BOUNDS.min,
			STEPS_BOUNDS.max,
		)
		activePresetId.value = null
	}

	const { scale } = useCalculateScale(settings)

	const tokens = computed(() =>
		generateTokens({
			outputFormat: outputFormat.value,
			scale: scale.value,
			settings,
		}),
	)

	return {
		activePresetId,
		currentViewportWidth,
		outputFormat,
		settings,

		scale,
		tokens,

		applyPreset,
		updateBaseRange,
		updateGridStep,
		updateIntermediateSteps,
		updateRatioRange,
		updateSettings,
		updateViewportRange,
	}
})
