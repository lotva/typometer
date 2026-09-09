import type { CssNode } from '../model'

import { highlightValue } from './highlight'
import { renderAst } from './renderer'

export function generateTokenHtml(nodes: CssNode[]) {
	if (nodes.length === 0) return ''

	const fontSizeValue = 'calc(var(--base) / 16 * 100%)'

	return [
		`<span class="token comment">/**</span>`,
		`<span class="token comment"> * Fluid Modular Scale</span>`,
		`<span class="token comment"> *</span>`,
		`<span class="token comment"> * Defines one modular scale across two viewport-bound configurations:</span>`,
		`<span class="token comment"> * \`--base-min\` and \`--ratio-min\` at \`--vw-min\`,</span>`,
		`<span class="token comment"> * \`--base-max\` and \`--ratio-max\` at \`--vw-max\`.</span>`,
		`<span class="token comment"> *</span>`,
		`<span class="token comment"> * The browser continuously interpolates the base and ratio, then derives</span>`,
		`<span class="token comment"> * every scale step from them as the viewport width changes.</span>`,
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
		]),
		'',
		`<span class="token selector">html</span> <span class="token brackets">{</span>`,
		`	<span class="token property">font-size</span><span class="token punctuation">:</span> ${highlightValue(fontSizeValue)}<span class="token semi">;</span>`,
		`<span class="token brackets">}</span>`,
		'',
		...renderAst([
			{
				children: nodes,
				selector: ':root',
				type: 'rule',
			},
		]),
	].join('\n')
}
