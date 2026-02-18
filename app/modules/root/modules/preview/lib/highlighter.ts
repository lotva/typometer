import { createHighlighterCore, createJavaScriptRegexEngine } from 'shiki'

export const highlighter = await createHighlighterCore({
	engine: createJavaScriptRegexEngine(),
	langs: [import('@shikijs/langs/css')],
	themes: [
		import('@shikijs/themes/vesper'),
		import('@shikijs/themes/vitesse-light'),
	],
})
