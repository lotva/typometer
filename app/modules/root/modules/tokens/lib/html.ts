import type { ITokens } from '../model'

import { highlightMediaQuery, highlightValue } from './highlight'

export function generateTokenHtml(tokens: ITokens) {
	const sections = [
		...generateFullSection(tokens),
		...generateRecommendedSection(tokens),
		...generateComputedSection(tokens),
		...generateMobileFirstSection(tokens),
	]

	return sections.join('\n')
}

function generateBlock(tokens: Record<string, string>) {
	const lines: string[] = []

	Object.entries(tokens).forEach(([key, value]) => {
		const valueHtml = highlightValue(value)
		lines.push(
			`	<span class="token property">${key}</span><span class="token punctuation">:</span> ${valueHtml}<span class="token semi">;</span>`,
		)
	})

	return lines
}

function generateComputedSection(tokens: ITokens) {
	if (!tokens.computed || Object.keys(tokens.computed).length === 0) return []

	const rootTokens = tokens.computed['root'] || {}

	return [
		'',
		`<span class="token comment">/**</span>`,
		`<span class="token comment"> * Computed Scale</span>`,
		`<span class="token comment"> *</span>`,
		`<span class="token comment"> * Dynamic scale calculated in the browser using</span>`,
		`<span class="token comment"> * the CSS pow() function. Change any variable and</span>`,
		`<span class="token comment"> * the entire scale updates automatically.</span>`,
		`<span class="token comment"> */</span>`,
		'',
		...renderRootWithMedia(
			rootTokens,
			tokens.computed,
			'Override the ratio to adjust for mobile screens:',
		),
	]
}

function generateFullSection(tokens: ITokens) {
	if (Object.keys(tokens.full).length === 0) return []

	return [
		`<span class="token comment">/* Full Scale */</span>`,
		'',
		...generateRootBlock(tokens.full),
	]
}

function generateMobileFirstSection(tokens: ITokens) {
	if (!tokens.mobileFirst || Object.keys(tokens.mobileFirst).length === 0) {
		return []
	}

	const rootTokens = tokens.mobileFirst['root'] || {}

	const header: string[] = [
		'',
		`<span class="token comment">/**</span>`,
		`<span class="token comment"> * Mobile-First Scale</span>`,
		`<span class="token comment"> *</span>`,
		`<span class="token comment"> * Base values are defined for mobile devices and</span>`,
		`<span class="token comment"> * progressively overridden at larger breakpoints</span>`,
		`<span class="token comment"> * using CSS variables inside media queries.</span>`,
		`<span class="token comment"> */</span>`,
		'',
	]

	return [...header, ...renderRootWithMedia(rootTokens, tokens.mobileFirst)]
}

function generateRecommendedSection(tokens: ITokens) {
	if (Object.keys(tokens.recommended).length === 0) return []

	return [
		'',
		`<span class="token comment">/**</span>`,
		`<span class="token comment"> * Recommended Scale</span>`,
		`<span class="token comment"> *</span>`,
		`<span class="token comment"> * A curated subset of tokens suitable for</span>`,
		`<span class="token comment"> * most interface and content use cases.</span>`,
		`<span class="token comment"> */</span>`,
		'',
		...generateRootBlock(tokens.recommended),
	]
}

function generateRootBlock(tokens: Record<string, string>) {
	const lines: string[] = [
		`<span class="token selector">:root</span> <span class="token brackets">{</span>`,
		...generateBlock(tokens),
		`<span class="token brackets">}</span>`,
	]

	return lines
}

function renderRootWithMedia(
	rootTokens: Record<string, string>,
	mediaMap: Record<string, Record<string, string>>,
	comment?: string,
) {
	const mediaQueries: string[] = []

	for (const [breakpoint, tokenMap] of Object.entries(mediaMap)) {
		if (breakpoint === 'root') continue

		mediaQueries.push(
			`\n	<span class="token atrule">@media</span> <span class="token brackets">(</span><span class="token media">${highlightMediaQuery(breakpoint)}</span><span class="token brackets">)</span> <span class="token brackets">{</span>`,
			...generateBlock(tokenMap).map((line) => `	${line}`),
			`	<span class="token brackets">}</span>`,
		)
	}

	const lines: string[] = [
		`<span class="token selector">:root</span> <span class="token brackets">{</span>`,
		...generateBlock(rootTokens),
	]

	if (comment) {
		const commentLines = comment
			.split('\n')
			.map((line) => `	<span class="token comment">/* ${line} */</span>`)

		lines.push('', ...commentLines)
	}

	lines.push(...mediaQueries, `<span class="token brackets">}</span>`)

	return lines
}
