export const TOKEN_NAMES = {
	semantic: {
		names: [
			'label',
			'small',
			'',
			'large',
			'subheading',
			'accent',
			'loud',
			'factoid',
			'heading',
			'shout',
		],
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
