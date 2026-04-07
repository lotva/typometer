import type { CssNode, ITokenContext } from '../model'

import { getTokenNameByIndex } from './naming'
import { findClosestIndex } from './utilities'

export function generateComputedTokens(context: ITokenContext): CssNode[] {
	const { settings, values } = context
	const { base, intermediateSteps, ratio, unit } = settings

	const baseIndex = findClosestIndex(values, base)
	if (baseIndex === -1) return []

	const rootNodes: CssNode[] = [
		{ prop: '--base', type: 'declaration', value: `${base}${unit}` },
		{ prop: '--ratio', type: 'declaration', value: String(ratio) },
		{
			prop: '--steps',
			type: 'declaration',
			value: String(intermediateSteps + 1),
		},
		{ prop: '--step', type: 'declaration', value: 'calc(1 / var(--steps))' },
		{ type: 'empty-line' },
	]

	values.forEach((_, index) => {
		const name = getTokenNameByIndex(index, context)
		if (!name) return

		const offset = index - baseIndex
		const variableName = `--${name}`

		rootNodes.push({
			prop: variableName,
			type: 'declaration',
			value:
				offset === 0
					? 'var(--base)'
					: `calc(var(--base) * pow(var(--ratio), ${offset} * var(--step)))`,
		})
	})

	const mobileRatio = computeMobileRatio(ratio)

	const mobileNodes: CssNode[] = [
		{ prop: '--ratio', type: 'declaration', value: String(mobileRatio) },
	]

	rootNodes.push(
		{ type: 'empty-line' },
		{
			isBlock: false,
			type: 'comment',
			value: 'Override the ratio to adjust for mobile screens:',
		},
		{ type: 'empty-line' },
		{
			children: mobileNodes,
			name: 'media',
			params: 'width < 768px',
			type: 'at-rule',
		},
	)

	return [{ children: rootNodes, selector: ':root', type: 'rule' }]
}

function computeMobileRatio(originalRatio: number) {
	if (originalRatio <= 1) return originalRatio

	const MAX_REDUCTION = 0.3
	const POWER = 1.5
	const delta = Math.min(
		MAX_REDUCTION,
		Math.pow(originalRatio - 1, POWER) * MAX_REDUCTION,
	)

	const mobile = originalRatio - delta
	return Math.max(1, parseFloat(mobile.toFixed(2)))
}
