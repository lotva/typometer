export const TOKEN_NAMES = {
	semantic: {
		names: ['small', '', 'h3', 'h2', 'loud', 'h1', 'shout'],
		overflowStrategy: 'numeric',
		prefix: 'font-size--',
	},

	tshirt: {
		names: ['xs', 's', '', 'l', 'xl'],
		overflowStrategy: 'tshirt',
		prefix: 'font-size--',
	},
}

export type TTokenConfig = (typeof TOKEN_NAMES)['semantic']
