import type { IPreset } from '../../model/types'

export const PRESETS: IPreset[] = [
	{
		base: 16,
		baseByUnit: {
			em: 1,
			px: 16,
		},
		gridStep: 4,
		gridStepByUnit: {
			em: 0.25,
			px: 4,
		},
		i18nNameKey: 'presets.classic',
		id: '2',
		intermediateSteps: 4,
		ratio: 2,
		shouldSnapToGrid: false,
		unit: 'px',
	},
	{
		base: 16,
		baseByUnit: {
			em: 1,
			px: 16,
		},
		gridStep: 4,
		gridStepByUnit: {
			em: 0.25,
			px: 4,
		},
		i18nNameKey: 'presets.geist',
		id: '1',
		intermediateSteps: 2,
		ratio: 1.5,
		shouldSnapToGrid: true,
		unit: 'px',
	},
]
