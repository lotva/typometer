import type { TOutputFormat } from '../../model/types'

export const TOKEN_NAMES_BY_OUTPUT_FORMAT: Record<TOutputFormat, string[]> = {
	numeric: [''],
	semantic: ['body', 'accent', 'heading'],
	tshirt: ['xs', 's', 'm', 'l', 'xl'],
}

export const RECOMMENDED_TOKEN_NAMES = [
	'lead',
	'heading-s',
	'heading-m',
	'heading-l',
	'heading-xl',
	'display',
]

export const PREFIX = '--font-size'
