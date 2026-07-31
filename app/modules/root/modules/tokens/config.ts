import type { TOutputFormat } from '../../model/types'

export const TOKEN_PROPERTY_PREFIX = '--fs-'

export const TOKEN_NAMES_BY_OUTPUT_FORMAT: Record<TOutputFormat, string[]> = {
	numeric: [''],
	semantic: ['body', 'accent', 'heading'],
	tshirt: ['xs', 's', 'm', 'l', 'xl'],
}

export const CATEGORIES = [
	{ maxRatio: 1, name: 'label', startRatio: 0 },
	{ maxRatio: 1.5, name: 'body', startRatio: 1 },
	{ maxRatio: 2, name: 'accent', startRatio: 1.5 },
	{ maxRatio: undefined, name: 'heading', startRatio: 2 },
] as const

export type TTokenCategory = (typeof CATEGORIES)[number]
