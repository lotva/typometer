import { createHighlighterCore, createJavaScriptRegexEngine } from 'shiki'

export const highlighterPromise = createHighlighterCore({
	engine: createJavaScriptRegexEngine(),
	langs: [import('@shikijs/langs/css')],
	themes: [
		import('@shikijs/themes/vesper'),
		import('@shikijs/themes/vitesse-light'),
	],
})

export const highlight = async (code: string) => {
	const highlighter = await highlighterPromise

	return highlighter.codeToHtml(code, {
		colorReplacements: {
			'#393a34': 'var(--color__foreground--muted)',
			'#101010': 'var(--color__background)',
			'#fff': 'var(--color__foreground)',
		},
		lang: 'css',
		themes: {
			dark: 'vesper',
			light: 'vitesse-light',
		},
	})
}
