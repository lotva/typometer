export default defineI18nLocale(async () => {
	return {
		controls: {
			ariaLabel: 'Typographic scale settings',
			base: 'Base',
			em: 'em',
			formula: 'Formula',
			grid: 'Snap to grid',
			gridDescription:
				'All typographic scale values will be multiples of the entered value',
			presets: 'Presets',
			px: 'px',
			ratio: 'Ratio',
			steps: 'Intermediate steps',
			unit: {
				em: 'Em',
				label: 'Unit',
				pixel: 'Pixels',
			},
		},
		copied: 'Copied',
		copyright: {
			projects: 'Projects',
			sourceCode: 'Source code',
			text: 'Built by Denis Nalitov',
		},
		description: 'Compose typographic scale as CSS tokens',
		outputFormat: {
			label: 'Output format',
			numeric: 'Numeric',
			semantic: 'Semantic',
			tshirt: 'T-Shirt',
		},
		panel: {
			collapse: 'Collapse panel',
			expand: 'Expand panel',
		},
		presets: {
			carbon: 'Carbon Design System',
			classic: 'Classic, from The Elements of Typographic Style',
			geist: 'Geist Design System',
			kontur: 'Kontur Guides',
			lowContrast: 'Low contrast',
			musicalTetratonic: 'Musical tetratonic scale',
			musicalTrinonic: 'Musical trinonic scale',
		},
		preview: {
			ariaLabel: 'Scale preview and token copy',
			example: 'Preview',
			scale: 'Scale',
			tokens: 'Tokens',
		},
		switchLanguage: 'Switch language',
		title: 'Typometer',
	}
})
