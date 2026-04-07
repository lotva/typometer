import type { ITokens } from '../model'

import { highlightValue } from './highlight'
import { renderAst } from './renderer'

export function generateTokenHtml(tokens: ITokens) {
	const sections = [
		...generateStaticSection(tokens),
		...generateFluidSection(tokens),
		...generateComputedSection(tokens),
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
	if (!tokens.computed || tokens.computed.length === 0) return []

	return [
		'',
		`<span class="token comment">/**</span>`,
		`<span class="token comment"> * Computed Scale</span>`,
		`<span class="token comment"> *</span>`,
		`<span class="token comment"> * No automatic fluid behavior. Override variables inside</span>`,
		`<span class="token comment"> * @media rules to adapt to different screens.</span>`,
		`<span class="token comment"> */</span>`,
		'',
		...renderAst(tokens.computed),
	]
}

function generateFluidSection(tokens: ITokens) {
	if (!tokens.fluid || tokens.fluid.length === 0) return []

	return [
		'',
		`<span class="token comment">/**</span>`,
		`<span class="token comment"> * Fluid Scale</span>`,
		`<span class="token comment"> *</span>`,
		`<span class="token comment"> * Define the minimum and maximum base size and ratio,</span>`,
		`<span class="token comment"> * then let the browser handle the transition. As the</span>`,
		`<span class="token comment"> * viewport grows, every token scales smoothly in between.</span>`,
		`<span class="token comment"> */</span>`,
		'',
		...renderAst([
			{
				children: [
					{ prop: 'syntax', type: 'declaration', value: `"&lt;length&gt;"` },
					{ prop: 'inherits', type: 'declaration', value: 'false' },
					{ prop: 'initial-value', type: 'declaration', value: '0px' },
				],
				prop: '--100vw',
				type: 'property',
			},
			{ type: 'empty-line' },
			{
				children: tokens.fluid,
				selector: ':root',
				type: 'rule',
			},
		]),
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

function generateStaticSection(tokens: ITokens) {
	if (Object.keys(tokens.static).length === 0) return []

	return [
		`<span class="token comment">/* Static Scale */</span>`,
		'',
		...generateRootBlock(tokens.static),
	]
}
