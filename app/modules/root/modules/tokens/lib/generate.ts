import { getFluidBaseBounds } from '~/modules/root/lib/scale'

import type { ITokenContext } from '../model'

import { getFluidTokenSizeValue, GRID_STEP_VAR } from './fluid-token'
import { getTokenNameByIndex, getTokenProperty } from './naming'

/**
 * Generates fluid tokens using CSS custom properties and `calc()`, `pow()`, `clamp()`.
 * Interpolates base and ratio between two viewports.
 */
export function generateTokens(context: ITokenContext): string {
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

	if (scale.length === 0) return ''

	const root: string[] = [
		`--base-min: ${Math.round(baseMin)};`,
		`--base-max: ${Math.round(baseMax)};`,
		`--ratio-min: ${ratioMin};`,
		`--ratio-max: ${ratioMax};`,
		'',
		'/* Viewport sizes: */',
		`--vw-min: ${viewportMin};`,
		`--vw-max: ${viewportMax};`,
		'',
		'/* Unitless viewport width: */',
		'--100vw: 100vw;',
		'--w: calc(tan(atan2(var(--100vw), 1px)));',
		'',
		'/* Interpolation: */',
		'--progress: clamp(\n\t\t0, (var(--w) - var(--vw-min)) / (var(--vw-max) - var(--vw-min)), 1\n\t);',
		'--base: calc(\n\t\tvar(--base-min) + (var(--base-max) - var(--base-min)) * var(--progress)\n\t);',
		'--ratio: calc(\n\t\tvar(--ratio-min) + (var(--ratio-max) - var(--ratio-min)) * var(--progress)\n\t);',
		'',
		`--steps: ${intermediateSteps + 1};`,
		'--step: calc(1 / var(--steps));',
		'',
	]

	if (shouldSnapToGrid) {
		root.push(`${GRID_STEP_VAR}: ${gridStep}px;`, '')
	}

	scale.forEach((point, index) => {
		const tokenName = getTokenNameByIndex(index, context)
		if (!tokenName) return

		root.push(
			`${getTokenProperty(tokenName)}: ${getFluidTokenSizeValue(point.exponent, settings)};`,
		)
	})

	return [
		'/**',
		' * Fluid Modular Scale',
		' *',
		' * Defines one modular scale across two viewport-bound configurations:',
		' * `--base-min` and `--ratio-min` at `--vw-min`,',
		' * `--base-max` and `--ratio-max` at `--vw-max`.',
		' *',
		' * The browser continuously interpolates the base and ratio, then derives',
		' * every scale step from them as the viewport width changes.',
		' */',
		'',
		'@property --100vw {',
		'\tsyntax: "<length>";',
		'\tinherits: false;',
		'\tinitial-value: 0px;',
		'}',
		'',
		'html {',
		'\tfont-size: calc(var(--base) / 16 * 100%);',
		'}',
		'',
		':root {',
		...root.map((line) => (line === '' ? '' : `\t${line}`)),
		'}',
	].join('\n')
}
