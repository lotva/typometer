export interface IPreset extends Omit<
	ISettings,
	'ratioMin' | 'viewportMax' | 'viewportMin'
> {
	i18nNameKey: string
	id: string
	ratioMin?: number
}

export interface IScalePoint {
	exponent: number
	value: number
}

export interface ISettings {
	baseMax: number
	baseMin: number
	gridStep: number
	intermediateSteps: number
	ratioMax: number
	ratioMin: number
	shouldSnapToGrid: boolean
	viewportMax: number
	viewportMin: number
}

export type TOutputFormat = 'numeric' | 'semantic' | 'tshirt'
export type TPreviewMode = 'scale' | 'tokens'
