import type { IScalePoint, ISettings, TOutputFormat } from '../../model/types'

export interface ITokenContext {
	outputFormat: TOutputFormat
	scale: IScalePoint[]
	settings: ISettings
}
