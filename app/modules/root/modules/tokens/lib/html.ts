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
		`<span class="token comment"> * --base-min/--base-max and --ratio-min/--ratio-max are the two</span>`,
		`<span class="token comment"> * endpoints of the scale. At --vw-min the scale uses the min</span>`,
		`<span class="token comment"> * values, at --vw-max it uses the max values, and the browser</span>`,
		`<span class="token comment"> * interpolates everything in between as the viewport resizes.</span>`,
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
