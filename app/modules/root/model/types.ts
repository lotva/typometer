export interface ICustomStep {
	offsetExponent: number
	position: 'after' | 'before' | 'between'
	referenceIndex: number
}

export interface IPreset extends Omit<ISettings, 'unit'> {
	i18nNameKey: string
	id: string
}

export interface IScaleItem {
	disabled: boolean
	exponent?: number
	isCustom: boolean
	value: number
}

export interface IScalePoint {
	exponent: number
	value: number
}

export interface ISettings {
	base: number
	baseByUnit: IValueByUnit
	customSteps: ICustomStep[]
	disabledIndices: Set<number>
	gridStep: number
	gridStepByUnit: IValueByUnit
	intermediateSteps: number
	ratio: number
	shouldSnapToGrid: boolean
	unit: TUnit
}

export type TOutputFormat = 'numeric' | 'semantic' | 'tshirt'
export type TPreviewMode = 'example' | 'scale' | 'tokens'
export type TUnit = 'em' | 'px'

interface IValueByUnit {
	em: number
	px: number
}
