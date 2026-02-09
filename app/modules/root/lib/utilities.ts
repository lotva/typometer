import type { ISettings } from '../model/types'

export function generateCss(tokens: Record<string, string>) {
	return `:root {\n${Object.entries(tokens)
		.map(([key, value]) => `  ${key}: ${value};`)
		.join('\n')}\n}`
}

export function generateRawScale(
	settings: Pick<ISettings, 'base' | 'intermediateSteps' | 'ratio' | 'unit'>,
) {
	const { base, intermediateSteps, ratio } = settings
	const n = intermediateSteps + 1
	const result: number[] = []

	let stepValue = base
	let index = -4

	do {
		stepValue = base * Math.pow(ratio, index++ / n)
	} while (
		Math.abs(stepValue) <= base * 6.5 &&
		index <= 40 &&
		result.push(stepValue)
	)

	return result
}

export function round(value: number, unit: ISettings['unit']) {
	return unit === 'px' ? Math.round(value) : Math.round(value * 100) / 100
}

export function snapToGrid(
	value: number,
	settings: Pick<ISettings, 'gridStep' | 'shouldSnapToGrid'>,
) {
	const { gridStep, shouldSnapToGrid } = settings

	if (!shouldSnapToGrid) return value

	return Math.round(value / gridStep) * gridStep
}
