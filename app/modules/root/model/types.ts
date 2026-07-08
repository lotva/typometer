export interface ICustomStep {
	offsetExponent: number
	position: 'after' | 'before' | 'between'
	referenceIndex: number
}

export interface IPreset extends ISettings {
	i18nNameKey: string
	id: string
}

export interface IScalePoint {
	exponent: number
	value: number
}

export interface ISettings {
	base: number
	customSteps: ICustomStep[]
	gridStep: number
	intermediateSteps: number
	ratio: number
	shouldSnapToGrid: boolean
}

export type TOutputFormat = 'numeric' | 'semantic' | 'tshirt'
export type TPreviewMode = 'scale' | 'tokens'
