import type { TOutputFormat } from '../../model/types'

export const TOKEN_NAMES_BY_OUTPUT_FORMAT: Record<TOutputFormat, string[]> = {
	numeric: [''],
	semantic: ['body', 'accent', 'heading'],
	tshirt: ['xs', 's', 'm', 'l', 'xl'],
}

export const MUSICAL_SCALES = [
	1.067, // Minor Second
	1.125, // Major Second
	1.2, // Minor Third
	1.25, // Major Third
	1.333, // Perfect Fourth
	1.414, // Augmented Fourth
	1.5, // Perfect Fifth
	1.667, // Major Sixth
	1.778, // Minor Seventh
	1.875, // Major Seventh
	2, // Octave
] as const

export const PREFIX = '--font-size'

export const CATEGORIES = [
	{ maxRatio: 1, name: 'label', startRatio: 0 },
	{ maxRatio: 1.5, name: 'body', startRatio: 1 },
	{ maxRatio: 2, name: 'accent', startRatio: 1.5 },
	{ maxRatio: undefined, name: 'heading', startRatio: 2 },
] as const

export type TTokenCategory = (typeof CATEGORIES)[number]
