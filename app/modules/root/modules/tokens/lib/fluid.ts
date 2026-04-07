import { round } from '~/modules/root/lib/scale'

import type { CssNode, ITokenContext } from '../model'

import { MUSICAL_SCALES } from '../config'
import { getTokenNameByIndex } from './naming'
import { findClosestIndex } from './utilities'

/**
 * Generates fluid tokens using CSS custom properties and `calc()`, `pow()`, `clamp()`.
 * This approach interpolates base and ratio between two viewports.
 */
export function generateFluidTokens(context: ITokenContext): CssNode[] {
	const { settings, values } = context
	const { base, intermediateSteps, ratio, unit } = settings

	const ratioMax = ratio
	const ratioMin = findClosestMusicalScale(ratioMax - (ratioMax - 1) * 0.3)

	const baseMax = base
	const baseMin = lerp(baseMax, baseMax / ratioMax, 0.5)

	const viewportMin = 360
	const viewportMax = 1440

	const baseIndex = findClosestIndex(values, base)
	if (baseIndex === -1) return []

	const nodes: CssNode[] = [
		{
			prop: '--base-min',
			type: 'declaration',
			value: `${round(baseMin, unit)}`,
		},
		{
			prop: '--base-max',
			type: 'declaration',
			value: `${round(baseMax, unit)}`,
		},
		{ prop: '--ratio-min', type: 'declaration', value: String(ratioMin) },
		{ prop: '--ratio-max', type: 'declaration', value: String(ratioMax) },
		{ type: 'empty-line' },

		{ type: 'comment', value: 'Viewport sizes:' },
		{ prop: '--vw-min', type: 'declaration', value: `${viewportMin}` },
		{ prop: '--vw-max', type: 'declaration', value: `${viewportMax}` },
		{ type: 'empty-line' },

		{ type: 'comment', value: 'Unitless viewport width:' },
		{
			prop: '--100vw',
			type: 'declaration',
			value: '100vw',
		},
		{
			prop: '--w',
			type: 'declaration',
			value: 'calc(tan(atan2(var(--100vw), 1px)))',
		},
		{ type: 'empty-line' },

		{ type: 'comment', value: 'Interpolation:' },
		{
			prop: '--progress',
			type: 'declaration',
			value:
				'clamp(\n		0, (var(--w) - var(--vw-min)) / (var(--vw-max) - var(--vw-min)), 1\n	)',
		},
		{
			prop: '--base',
			type: 'declaration',
			value: `calc(\n		(var(--base-min) + (var(--base-max) - var(--base-min)) * var(--progress)) * 1${unit}\n	)`,
		},
		{
			prop: '--ratio',
			type: 'declaration',
			value:
				'calc(\n		var(--ratio-min) + (var(--ratio-max) - var(--ratio-min)) * var(--progress)\n	)',
		},
		{ type: 'empty-line' },

		{
			prop: '--steps',
			type: 'declaration',
			value: String(intermediateSteps + 1),
		},
		{
			prop: '--step',
			type: 'declaration',
			value: 'calc(1 / var(--steps))',
		},
		{ type: 'empty-line' },
	]

	values.forEach((_, index) => {
		const tokenName = getTokenNameByIndex(index, context)
		if (!tokenName) return

		const offset = index - baseIndex
		const variableName = `--${tokenName}`

		nodes.push({
			prop: variableName,
			type: 'declaration',
			value:
				offset === 0
					? 'var(--base)'
					: `calc(var(--base) * pow(var(--ratio), ${offset} * var(--step)))`,
		})
	})

	return nodes
}

function findClosestMusicalScale(value: number): number {
	return MUSICAL_SCALES.reduce((previous, current) =>
		Math.abs(current - value) < Math.abs(previous - value) ? current : previous,
	)
}

function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t
}
