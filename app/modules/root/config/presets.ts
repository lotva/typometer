import type { IPreset } from '../model/types'

export const PRESETS: IPreset[] = [
	{
		base: 16,
		baseByUnit: {
			em: 1,
			px: 16,
		},
		customSteps: [],
		disabledIndices: new Set(),
		gridStep: 4,
		gridStepByUnit: {
			em: 0.25,
			px: 4,
		},
		i18nNameKey: 'presets.classic',
		id: 'classic',
		intermediateSteps: 4,
		ratio: 2,
		shouldSnapToGrid: false,
	},
	{
		base: 16,
		baseByUnit: {
			em: 1,
			px: 16,
		},
		customSteps: [],
		disabledIndices: new Set(),
		gridStep: 4,
		gridStepByUnit: {
			em: 0.25,
			px: 4,
		},
		i18nNameKey: 'presets.geist',
		id: 'geist',
		intermediateSteps: 2,
		ratio: 1.5,
		shouldSnapToGrid: true,
	},
	{
		base: 16,
		baseByUnit: {
			em: 1,
			px: 16,
		},
		customSteps: [
			{
				offsetExponent: 0.5,
				position: 'between',
				referenceIndex: 0,
			},
		],
		disabledIndices: new Set(),
		gridStep: 4,
		gridStepByUnit: {
			em: 0.25,
			px: 4,
		},
		i18nNameKey: 'presets.carbon',
		id: 'carbon',
		intermediateSteps: 4,
		ratio: 3.375,
		shouldSnapToGrid: false,
	},
	{
		base: 16,
		baseByUnit: {
			em: 1,
			px: 16,
		},
		customSteps: [
			{
				offsetExponent: 0.5,
				position: 'between',
				referenceIndex: 0,
			},
		],
		disabledIndices: new Set([11, 12, 13, 14]),
		gridStep: 4,
		gridStepByUnit: {
			em: 0.25,
			px: 4,
		},
		i18nNameKey: 'presets.kontur',
		id: 'kontur',
		intermediateSteps: 2,
		ratio: 1.5,
		shouldSnapToGrid: true,
	},
	{
		base: 1,
		baseByUnit: {
			em: 1,
			px: 20,
		},
		customSteps: [],
		disabledIndices: new Set(),
		gridStep: 4,
		gridStepByUnit: {
			em: 0.25,
			px: 4,
		},
		i18nNameKey: 'presets.musicalTrinonic',
		id: 'musicalTrinonic',
		intermediateSteps: 2,
		ratio: 2,
		shouldSnapToGrid: false,
	},
	{
		base: 1,
		baseByUnit: {
			em: 1,
			px: 20,
		},
		customSteps: [],
		disabledIndices: new Set(),
		gridStep: 4,
		gridStepByUnit: {
			em: 0.25,
			px: 4,
		},
		i18nNameKey: 'presets.musicalTetratonic',
		id: 'musicalTetratonic',
		intermediateSteps: 3,
		ratio: 2,
		shouldSnapToGrid: false,
	},
	{
		base: 20,
		baseByUnit: {
			em: 1,
			px: 20,
		},
		customSteps: [],
		disabledIndices: new Set(),
		gridStep: 4,
		gridStepByUnit: {
			em: 0.25,
			px: 4,
		},
		i18nNameKey: 'presets.majorThird',
		id: 'majorThird',
		intermediateSteps: 0,
		ratio: 1.25,
		shouldSnapToGrid: true,
	},
]
