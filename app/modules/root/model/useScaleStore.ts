import type { ICustomStep, ISettings, TOutputFormat, TUnit } from './types'

import { PRESETS } from '../config/presets'
import { convert } from '../lib/scale'
import { useCalculateScale } from '../lib/useCalculateScale'
import { generateTokens } from '../modules/tokens'

export const useScaleStore = defineStore('scale', () => {
	const settings = reactive<ISettings>({
		base: 21,
		baseByUnit: {
			em: 1,
			px: 21,
		},
		intermediateSteps: 2,
		ratio: 1.5,

		unit: 'px',

		gridStep: 4,
		gridStepByUnit: {
			em: 0.25,
			px: 4,
		},
		shouldSnapToGrid: false,

		customSteps: [],
		disabledIndices: new Set<number>(),
	})

	const outputFormat = ref<TOutputFormat>('semantic')
	const activePresetId = ref<null | string>(null)

	function applyPreset(presetId: string) {
		const preset = PRESETS.find((p) => p.id === presetId)

		if (preset) {
			Object.assign(settings, preset)
			settings.base = preset.baseByUnit[settings.unit]
			settings.gridStep = preset.gridStepByUnit[settings.unit]
			activePresetId.value = presetId
		}
	}

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

	const tokens = computed(() =>
		generateTokens(mergedScale.value, outputFormat.value, settings),
	)

	return {
		activePresetId,
		outputFormat,
		settings,

		scale: mergedScale,
		tokens,

		addCustomStep,
		applyPreset,
		removeCustomStep,
		toggleDisableIndex,
		updateBase,
		updateGridStep,
		updateIntermediateSteps,
		updateSettings,
	}
})
