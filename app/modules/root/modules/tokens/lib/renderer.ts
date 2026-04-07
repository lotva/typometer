import type { CssNode } from '../model'

import { highlightMediaQuery, highlightValue } from './highlight'

export function renderAst(nodes: CssNode[], indent = 0): string[] {
	const lines: string[] = []
	const padding = '\t'.repeat(indent)

	nodes.forEach((node) => {
		switch (node.type) {
			case 'at-rule':
				lines.push(
					`${padding}<span class="token atrule">@${node.name}</span> <span class="token punctuation">(</span><span class="token media">${highlightMediaQuery(node.params)}</span><span class="token punctuation">)</span> <span class="token brackets">{</span>`,
					...renderAst(node.children, indent + 1),
					`${padding}<span class="token brackets">}</span>`,
				)
				break

			case 'comment':
				if (node.isBlock) {
					lines.push(`${padding}<span class="token comment">/**</span>`)
					node.value.split('\n').forEach((line) => {
						lines.push(
							`${padding}<span class="token comment"> * ${line}</span>`,
						)
					})
					lines.push(`${padding}<span class="token comment"> */</span>`)
				} else {
					lines.push(
						`${padding}<span class="token comment">/* ${node.value} */</span>`,
					)
				}
				break

			case 'declaration':
				lines.push(
					`${padding}<span class="token property">${node.prop}</span><span class="token punctuation">:</span> ${highlightValue(node.value)}<span class="token semi">;</span>`,
				)
				break

			case 'empty-line':
				lines.push('')
				break

			case 'property':
				lines.push(
					`${padding}<span class="token atrule">@property</span> <span class="token property">${node.prop}</span> <span class="token brackets">{</span>`,
					...renderAst(node.children, indent + 1),
					`${padding}<span class="token brackets">}</span>`,
				)
				break

			case 'rule':
				lines.push(
					`${padding}<span class="token selector">${node.selector}</span> <span class="token brackets">{</span>`,
					...renderAst(node.children, indent + 1),
					`${padding}<span class="token brackets">}</span>`,
				)
				break
		}
	})

	return lines
}
