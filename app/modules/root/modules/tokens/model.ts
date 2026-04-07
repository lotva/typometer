import type { ISettings, TOutputFormat } from '../../model/types'

export type CssNode =
	| { children: CssNode[]; name: string; params: string; type: 'at-rule' }
	| { children: CssNode[]; prop: string; type: 'property' }
	| { children: CssNode[]; selector: string; type: 'rule' }
	| { isBlock?: boolean; type: 'comment'; value: string }
	| { prop: string; type: 'declaration'; value: string }
	| { type: 'empty-line' }

export interface ITokenContext {
	outputFormat: TOutputFormat
	settings: ISettings
	values: number[]
}

export interface ITokens {
	computed: CssNode[]
	fluid: CssNode[]
	static: Record<string, string>
}
