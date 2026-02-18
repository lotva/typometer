/* eslint-disable perfectionist/sort-objects */

import type {
	ICustomStep,
	ISettings,
	TOutputFormat,
	TPreviewMode,
	TUnit,
} from './types'

import { PRESETS } from '../config/presets'
import { convert } from '../lib/scale.utilities'
import { useCalculateScale } from '../lib/useCalculateScale'
import { useGenerateTokens } from '../lib/useGenerateTokens'

export const useScaleStore = defineStore('scale', () => {
	const settings = reactive<ISettings>({
		base: 21,
		baseByUnit: {
			px: 21,
			em: 1,
		},
		intermediateSteps: 2,
		ratio: 1.5,

		unit: 'px',

		shouldSnapToGrid: false,
		gridStep: 4,
		gridStepByUnit: {
			px: 4,
			em: 0.25,
		},

		customSteps: [],
		disabledIndices: new Set<number>(),
	})

	const outputFormat = ref<TOutputFormat>('semantic')
	const previewMode = ref<TPreviewMode>('scale')
	const activePresetId = ref<null | string>(null)

	watch(
		() => [settings.ratio, settings.intermediateSteps],
		() => {
			activePresetId.value = null
		},
		{ immediate: false, flush: 'sync' },
	)

	function applyPreset(presetId: string) {
		const preset = PRESETS.find((p) => p.id === presetId)

		if (preset) {
			Object.assign(settings, preset)
			activePresetId.value = presetId
		}
	}

	// TODO: вынести в компосабл (вероятно?)
	function updateSettings(updated: Partial<ISettings>) {
		Object.assign(settings, updated)
	}

	function updateBase(updated: number, unit: TUnit) {
		settings.baseByUnit[unit] = updated

		if (unit === settings.unit) {
			settings.base = updated
		}
	}

	function updateGridStep(updated: number, unit: TUnit) {
		const oppositeUnit = unit === 'px' ? 'em' : 'px'

		settings.gridStepByUnit[unit] = updated
		settings.gridStepByUnit[oppositeUnit] = convert(updated, unit, oppositeUnit)

		if (unit === settings.unit) {
			settings.gridStep = updated
		}
	}

	function updateIntermediateSteps(steps: number) {
		settings.intermediateSteps = steps
		settings.customSteps = []
		settings.disabledIndices.clear()
		activePresetId.value = null
	}

	// TODO: вынести в компосабл
	function addCustomStep(step: Omit<ICustomStep, 'offsetExponent'>) {
		const offsetExponent = 0.5
		settings.customSteps.push({ ...step, offsetExponent })
	}

	function removeCustomStep(index: number) {
		settings.customSteps.splice(index, 1)
	}

	function toggleDisableIndex(index: number) {
		if (settings.disabledIndices.has(index)) {
			settings.disabledIndices.delete(index)
		} else {
			settings.disabledIndices.add(index)
		}
	}

	const { mergedScale } = useCalculateScale(settings)

	const { css, tokens } = useGenerateTokens(
		mergedScale,
		() => settings.unit,
		outputFormat,
		() => settings.base,
		() => settings.disabledIndices,
	)

	return {
		settings,
		outputFormat,
		previewMode,
		activePresetId,

		scale: mergedScale,
		css,
		tokens,

		applyPreset,
		updateSettings,
		updateBase,
		updateGridStep,
		updateIntermediateSteps,
		addCustomStep,
		removeCustomStep,
		toggleDisableIndex,
	}
})
