export default {
	extends: [
		'stylelint-config-recommended',
		'stylelint-config-standard-vue',
		'stylelint-config-clean-order',
	],

	plugins: ['stylelint-plugin-logical-css'],

	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['mixin', 'define-mixin', 'mixin-content'],
			},
		],

		'color-function-notation': 'modern',

		'declaration-property-value-no-unknown': null,

		'no-descending-specificity': [true, { severity: 'warning' }],

		'order/order': [
			[
				'custom-properties',
				{ name: 'mixin', type: 'at-rule' },
				'declarations',
				'at-rules',
				{ hasBlock: true, name: 'media', type: 'at-rule' },
				'rules',
			],
		],

		'plugin/use-logical-properties-and-values': [true, { severity: 'warning' }],

		'plugin/use-logical-units': [true, { severity: 'warning' }],

		'rule-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
			},
		],

		'selector-class-pattern': [
			/^(?!.*--)(?:[a-z][\da-z]*(?:-[\da-z]+)*|_[a-z][\da-z]*(?:-[\da-z]+)*)$/,
			{
				message:
					'Selector should be written in kebab-case and modifiers should start with _',
			},
		],
	},
}
