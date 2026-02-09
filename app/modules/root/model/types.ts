export interface IPreset extends ISettings {
	id: string
	name: string
}

export interface ISettings {
	base: number
	baseByUnit: { em: number; px: number }
	gridStep: number
	intermediateSteps: number
	ratio: number
	shouldSnapToGrid: boolean
	unit: TUnit
}

export type TOutputFormat = 'semantic' | 'tshirt'
export type TPreviewMode = 'example' | 'scale' | 'tokens'
export type TUnit = 'em' | 'px'
