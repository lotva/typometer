import type { ISettings, TOutputFormat } from '../../model/types'
import type { TTokenConfig } from './config'

export interface ITokenContext {
	config: TTokenConfig
	outputFormat: TOutputFormat
	settings: ISettings
	values: number[]
}

export interface ITokens {
	computed: Record<string, string>
	full: Record<string, string>
	mobileFirst: Record<string, Record<string, string>>
	recommended: Record<string, string>
}

export const CATEGORIES = [
	{ maxRatio: 1, name: 'label', startRatio: 0 },
	{ maxRatio: 1.5, name: 'body', startRatio: 1 },
	{ maxRatio: 2, name: 'accent', startRatio: 1.5 },
	{ maxRatio: undefined, name: 'heading', startRatio: 2 },
] as const

export interface IBreakpoint {
	key: TBreakpointKey
	maxRatio: number
	minWidth: number
	rootScale: number
}

export type TBreakpointKey =
	| 'root'
	| 'width >= 768px'
	| 'width >= 1024px'
	| 'width >= 1440px'

export type TTokenCategory = (typeof CATEGORIES)[number]
