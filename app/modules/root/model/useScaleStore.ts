/* eslint-disable perfectionist/sort-objects */

import type { ISettings, TOutputFormat, TPreviewMode, TUnit } from './types'

import { useCalculateScale } from '../lib/useCalculateScale'
import { useGenerateTokens } from '../lib/useGenerateTokens'
import { convert } from '../lib/utilities'
import { PRESETS } from '../modules/config/presets'

export const useScaleStore = defineStore('scale', () => {
	const settings = reactive<ISettings>({
		base: 12,
		baseByUnit: {
			px: 12,
			em: 1,
		},
		intermediateSteps: 4,
		ratio: 2,

		unit: 'px',

		shouldSnapToGrid: false,
		gridStep: 4,
		gridStepByUnit: {
			px: 4,
			em: 0.25,
		},
	})

	const outputFormat = ref<TOutputFormat>('tshirt')
	const previewMode = ref<TPreviewMode>('example')
	const activePresetId = ref<null | string>(null)

	watch(
		() => settings,
		() => {
			activePresetId.value = null
		},
		{ deep: true, immediate: false, flush: 'sync' },
	)

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

	const { snappedScale } = useCalculateScale(settings)
	const { css } = useGenerateTokens(
		snappedScale,
		() => settings.unit,
		outputFormat,
		() => settings.base,
	)

	return {
		settings,
		outputFormat,
		previewMode,
		activePresetId,

		scale: snappedScale,
		css,

		applyPreset,
		updateSettings,
		updateBase,
		updateGridStep,
	}
})
