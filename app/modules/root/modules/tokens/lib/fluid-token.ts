import type { ISettings } from '../../../model/types'

export const GRID_STEP_VAR = '--grid-step'

const PREVIEW_BASE = 'calc(var(--base) * 1px)'
const TOKEN_BASE = '1rem'

export function getFluidPreviewFontSize(
	offset: number,
	settings: Pick<ISettings, 'gridStep' | 'shouldSnapToGrid'>,
): string {
	return getFluidSizeExpression(offset, settings, PREVIEW_BASE)
}

export function getFluidTokenSizeValue(
	offset: number,
	settings: Pick<ISettings, 'gridStep' | 'shouldSnapToGrid'>,
): string {
	return getFluidSizeExpression(offset, settings, TOKEN_BASE)
}

function getFluidSizeExpression(
	offset: number,
	settings: Pick<ISettings, 'gridStep' | 'shouldSnapToGrid'>,
	baseUnit: string,
): string {
	if (!settings.shouldSnapToGrid) {
		if (offset === 0) return baseUnit

		return `calc(${baseUnit} * pow(var(--ratio), ${offset} * var(--step)))`
	}

	const fluidSize =
		offset === 0
			? PREVIEW_BASE
			: `calc(${PREVIEW_BASE} * pow(var(--ratio), ${offset} * var(--step)))`

	const step = offset < 0 ? '1px' : `var(${GRID_STEP_VAR})`

	return `round(nearest, ${fluidSize}, ${step})`
}
