declare module 'microlighter' {
	interface HighlightAllOptions {
		languageAliases?: Record<string, string>
		root?: ParentNode
		selector?: string
	}

	export function highlightAll(
		options?: HighlightAllOptions,
	): Promise<HTMLElement[]>
}
