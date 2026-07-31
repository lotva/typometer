import type { IScalePoint, ISettings, TOutputFormat } from '../../model/types'

export type CssNode =
	| { children: CssNode[]; name: string; params: string; type: 'at-rule' }
	| { children: CssNode[]; prop: string; type: 'property' }
	| { children: CssNode[]; selector: string; type: 'rule' }
	| { isBlock?: boolean; type: 'comment'; value: string }
	| { prop: string; type: 'declaration'; value: string }
	| { type: 'empty-line' }

export interface ITokenContext {
	outputFormat: TOutputFormat
	scale: IScalePoint[]
	settings: ISettings
}
