export default defineI18nLocale(async () => {
	return {
		controls: {
			ariaLabel: 'Typographic scale settings',
			base: {
				label: 'Base',
				max: 'Maximum',
				min: 'Minimum',
			},
			decreaseNamed: 'Decrease {name}',
			decreaseValue: 'Decrease',
			grid: 'Snap to grid',
			gridDescription:
				'All typographic scale values will be multiples of the entered value',
			gridStep: 'Grid step, {unit}',
			hotkeyHint: 'Hotkey {key}',
			increaseNamed: 'Increase {name}',
			increaseValue: 'Increase',
			presets: 'Presets',
			px: 'px',
			ratio: {
				label: 'Ratio',
				max: 'Maximum ratio',
				min: 'Minimum ratio',
			},
			steps: 'Intermediate steps',
			viewport: {
				label: 'Viewport width',
				max: 'Maximum width',
				min: 'Minimum width',
			},
		},
		copied: 'Copied',
		copyright: {
			ariaLabel: 'Credits and links',
			projects: 'Projects',
			sourceCode: 'Source code',
			text: 'Built by Denis Nalitov',
		},
		description: 'Compose typographic scale as CSS tokens',
		languages: {
			en: 'English',
			ru: 'Русский',
		},
		loading: 'Loading...',
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
			classic: 'Classic, from The Elements of Typographic Style',
			geist: 'Geist Design System',
			majorThird: 'Major Third',
			musicalTetratonic: 'Musical tetratonic scale',
			musicalTrinonic: 'Musical trinonic scale',
			polaris: 'Shopify Polaris',
			spectrum: 'Adobe Spectrum',
		},
		preview: {
			ariaLabel: 'Scale preview and token copy',
			copy: 'Copy',
			copyCss: 'Copy CSS',
			currentViewportWidth: 'Current viewport width',
			generatedTokens: 'Generated CSS tokens',
			probeLegend:
				'Each row lists font sizes for mobile, current viewport, and desktop, in that order.',
			probeSizesAria: 'Mobile {mobile}, current {current}, desktop {desktop}',
			scale: 'Scale',
			scaleTableCaption: 'Typographic scale at different viewport widths',
			tokens: 'Tokens',
		},
		switchLanguage: 'Switch language',
		title: 'Typometer',
	}
})
