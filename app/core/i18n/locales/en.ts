export default defineI18nLocale(async () => {
	return {
		controls: {
			ariaLabel: 'Typographic scale settings',
			base: 'Base',
			em: 'em',
			formula: 'Formula',
			grid: 'Snap to grid',
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
		description: 'Compose typographic scale as CSS tokens',
		presets: {
			classic: 'Classic, from The Elements of Typographic Style',
			geist: 'Geist Design System',
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
