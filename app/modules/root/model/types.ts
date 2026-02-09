export interface IPreset extends ISettings {
	i18nNameKey: string
	id: string
}

export interface ISettings {
	base: number
	baseByUnit: IValueByUnit
	gridStep: number
	gridStepByUnit: IValueByUnit
	intermediateSteps: number
	ratio: number
	shouldSnapToGrid: boolean
	unit: TUnit
}

export type TOutputFormat = 'semantic' | 'tshirt'
export type TPreviewMode = 'example' | 'scale' | 'tokens'
export type TUnit = 'em' | 'px'

interface IValueByUnit {
	em: number
	px: number
}
