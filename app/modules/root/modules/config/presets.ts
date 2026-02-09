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
		id: '1',
		intermediateSteps: 2,
		name: 'Geist Design System',
		ratio: 1.5,
		shouldSnapToGrid: true,
		unit: 'px',
	},
	{
		base: 12,
		baseByUnit: {
			em: 1,
			px: 12,
		},
		gridStep: 4,
		gridStepByUnit: {
			em: 0.25,
			px: 4,
		},
		id: '2',
		intermediateSteps: 4,
		name: 'Alt',
		ratio: 2,
		shouldSnapToGrid: false,
		unit: 'px',
	},
]
