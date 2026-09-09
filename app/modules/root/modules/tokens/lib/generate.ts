import { getFluidBaseBounds } from '~/modules/root/lib/scale'

import type { CssNode, ITokenContext } from '../model'

import { getFluidTokenSizeValue, GRID_STEP_VAR } from './fluid-token'
import { getTokenNameByIndex, getTokenProperty } from './naming'

/**
 * Generates fluid tokens using CSS custom properties and `calc()`, `pow()`, `clamp()`.
 * Interpolates base and ratio between two viewports.
 */
export function generateTokens(context: ITokenContext): CssNode[] {
	const { scale, settings } = context
	const {
		gridStep,
		intermediateSteps,
		ratioMax,
		ratioMin,
		shouldSnapToGrid,
		viewportMax,
		viewportMin,
	} = settings
	const { baseMax, baseMin } = getFluidBaseBounds(settings)

	if (scale.length === 0) return []

	const nodes: CssNode[] = [
		{
			prop: '--base-min',
			type: 'declaration',
			value: `${Math.round(baseMin)}`,
		},
		{
			prop: '--base-max',
			type: 'declaration',
			value: `${Math.round(baseMax)}`,
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
			value:
				'calc(\n		var(--base-min) + (var(--base-max) - var(--base-min)) * var(--progress)\n	)',
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

	if (shouldSnapToGrid) {
		nodes.push(
			{
				prop: GRID_STEP_VAR,
				type: 'declaration',
				value: `${gridStep}px`,
			},
			{ type: 'empty-line' },
		)
	}

	scale.forEach((point, index) => {
		const tokenName = getTokenNameByIndex(index, context)
		if (!tokenName) return

		const variableName = getTokenProperty(tokenName)

		nodes.push({
			prop: variableName,
			type: 'declaration',
			value: getFluidTokenSizeValue(point.exponent, settings),
		})
	})

	return nodes
}
