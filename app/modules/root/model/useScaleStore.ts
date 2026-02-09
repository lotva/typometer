/* eslint-disable perfectionist/sort-objects */

import type { ISettings, TOutputFormat, TPreviewMode, TUnit } from './types'

import { useCalculateScale } from '../lib/useCalculateScale'
import { useGenerateTokens } from '../lib/useGenerateTokens'
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
	})

	const outputFormat = ref<TOutputFormat>('tshirt')
	const previewMode = ref<TPreviewMode>('example')

	function applyPreset(presetId: string) {
		const preset = PRESETS.find((p) => p.id === presetId)
		if (preset) {
			Object.assign(settings, preset)
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

	const { snappedScale } = useCalculateScale(settings)
	const { css } = useGenerateTokens(
		snappedScale,
		() => settings.unit,
		outputFormat,
		() => settings.base,
	)

	const scale = computed(() => snappedScale.value)

	return {
		settings,
		outputFormat,
		previewMode,

		scale,
		css,

		applyPreset,
		updateSettings,
		updateBase,
	}
})
