export const TOKEN_NAMES = {
	numeric: {
		names: [''],
		overflowStrategy: 'numeric',
		prefix: 'font-size',
	},

	semantic: {
		names: ['body', 'accent', 'heading'],
		overflowStrategy: 'categories',
		prefix: 'font-size',
	},

	tshirt: {
		names: ['xs', 's', '', 'l', 'xl'],
		overflowStrategy: 'tshirt',
		prefix: 'font-size',
	},
}

export const RECOMMENDED_TOKEN_NAMES = [
	'lead',
	'heading-s',
	'heading-m',
	'heading-l',
	'heading-xl',
	'display',
]

export type TTokenConfig = (typeof TOKEN_NAMES)[keyof typeof TOKEN_NAMES]
