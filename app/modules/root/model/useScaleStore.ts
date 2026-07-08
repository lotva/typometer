import type { ISettings, TOutputFormat } from './types'

import { PRESETS } from '../config/presets'
import { useCalculateScale } from '../lib/useCalculateScale'
import { generateTokens } from '../modules/tokens'

export const useScaleStore = defineStore('scale', () => {
	const settings = reactive<ISettings>({
		base: 21,
		intermediateSteps: 2,
		ratio: 1.5,

		gridStep: 4,
		shouldSnapToGrid: false,

		customSteps: [],
	})

	const outputFormat = ref<TOutputFormat>('semantic')
	const activePresetId = ref<null | string>(null)

	function applyPreset(presetId: string) {
		const preset = PRESETS.find((p) => p.id === presetId)

		if (preset) {
			Object.assign(settings, preset)
			activePresetId.value = presetId
		}
	}

	function updateSettings(updated: Partial<ISettings>) {
		Object.assign(settings, updated)
	}

	function updateBase(value: number) {
		settings.base = value
	}

	function updateGridStep(value: number) {
		settings.gridStep = value
	}

	function updateIntermediateSteps(steps: number) {
		settings.intermediateSteps = steps
		settings.customSteps = []
		activePresetId.value = null
	}

	function removeCustomStep(index: number) {
		settings.customSteps.splice(index, 1)
	}

	const { mergedScale } = useCalculateScale(settings)

	const tokens = computed(() =>
		generateTokens({
			outputFormat: outputFormat.value,
			settings,
			values: mergedScale.value,
		}),
	)

	return {
		activePresetId,
		outputFormat,
		settings,

		scale: mergedScale,
		tokens,

		applyPreset,
		removeCustomStep,
		updateBase,
		updateGridStep,
		updateIntermediateSteps,
		updateSettings,
	}
})
