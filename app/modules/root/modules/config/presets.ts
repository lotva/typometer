import type { IPreset } from '../../model/types'

export const PRESETS: IPreset[] = [
	{
		base: 1,
		baseByUnit: {
			em: 1,
			px: 16,
		},
		gridStep: 4,
		id: 'preset-1',
		intermediateSteps: 0,
		ratio: 1.5,
		name: 'Default',
		range: { end: 8, start: -3 },
		shouldSnapToGrid: false,
		unit: 'em',
	},
	{
		base: 12,
		baseByUnit: {
			em: 1,
			px: 12,
		},
		gridStep: 4,
		id: 'preset-2',
		intermediateSteps: 4,
		ratio: 2,
		name: 'Alt',
		range: { end: 8, start: -3 },
		shouldSnapToGrid: false,
		unit: 'px',
	},
]
