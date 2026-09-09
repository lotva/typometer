import type { ISettings } from '../model/types'

const REFERENCE_RATIO_MAX = 2

const SCALE_MIN_FACTOR = 0.65
const SCALE_MAX_FACTOR = 6.25

/** Worst in-bounds case (~ratio 1.1, 4 steps) needs ~120; this is a safety cap. */
const MAX_EXTRA_EXPONENT_STEPS = 128

export function clamp(value: number, boundA: number, boundB: number) {
	const lo = Math.min(boundA, boundB)
	const hi = Math.max(boundA, boundB)

	return Math.max(lo, Math.min(hi, value))
}

export function computeFluidTokenPx(
	offset: number,
	viewportWidth: number,
	settings: Pick<
		ISettings,
		| 'baseMax'
		| 'baseMin'
		| 'gridStep'
		| 'intermediateSteps'
		| 'ratioMax'
		| 'ratioMin'
		| 'shouldSnapToGrid'
		| 'viewportMax'
		| 'viewportMin'
	>,
) {
	const { baseMax, baseMin } = getFluidBaseBounds(settings)

	const span = settings.viewportMax - settings.viewportMin
	const progress =
		span === 0 ? 0 : clamp((viewportWidth - settings.viewportMin) / span, 0, 1)

	const base = baseMin + (baseMax - baseMin) * progress
	const ratio =
		settings.ratioMin + (settings.ratioMax - settings.ratioMin) * progress
	const step = 1 / (settings.intermediateSteps + 1)

	const px = offset === 0 ? base : base * Math.pow(ratio, offset * step)

	if (settings.shouldSnapToGrid && offset >= 0) {
		return snapValue(px, settings.gridStep)
	}

	return Math.round(px)
}

export function generateRawScale(
	settings: Pick<ISettings, 'baseMax' | 'intermediateSteps' | 'ratioMax'>,
) {
	const { baseMax, intermediateSteps, ratioMax } = settings
	const stepsPerOctave = intermediateSteps + 1
	const exponents = extendExponentsForLowRatio(
		getScaleExponents(baseMax, intermediateSteps),
		baseMax,
		ratioMax,
		intermediateSteps,
	)

	return exponents.map((exponent) => ({
		exponent,
		value: valueAtExponent(baseMax, ratioMax, exponent, stepsPerOctave),
	}))
}

export function getFluidBaseBounds(
	settings: Pick<
		ISettings,
		'baseMax' | 'baseMin' | 'gridStep' | 'shouldSnapToGrid'
	>,
) {
	return {
		baseMax: snapToGrid(settings.baseMax, settings),
		baseMin: snapToGrid(settings.baseMin, settings),
	}
}

export function snapToGrid(
	value: number,
	settings: Pick<ISettings, 'gridStep' | 'shouldSnapToGrid'>,
) {
	const { gridStep, shouldSnapToGrid } = settings

	if (!shouldSnapToGrid) return value

	return snapValue(value, gridStep)
}

export function snapValue(value: number, gridStep: number): number {
	return Math.round(value / gridStep) * gridStep
}

function extendExponentsForLowRatio(
	exponents: number[],
	baseMax: number,
	ratioMax: number,
	intermediateSteps: number,
): number[] {
	if (ratioMax <= 1 || ratioMax >= REFERENCE_RATIO_MAX) {
		return exponents
	}

	const stepsPerOctave = intermediateSteps + 1
	const targetMax = baseMax * SCALE_MAX_FACTOR
	const targetMin = baseMax * SCALE_MIN_FACTOR
	const result = [...exponents]
	let maxExponent = result.at(-1) ?? 0
	let maxValue = valueAtExponent(baseMax, ratioMax, maxExponent, stepsPerOctave)

	let extra = 0

	while (maxValue < targetMax && extra < MAX_EXTRA_EXPONENT_STEPS) {
		maxExponent += 1
		maxValue = valueAtExponent(baseMax, ratioMax, maxExponent, stepsPerOctave)
		result.push(maxExponent)
		extra += 1
	}

	let minExponent = result[0] ?? 0
	extra = 0

	while (extra < MAX_EXTRA_EXPONENT_STEPS) {
		minExponent -= 1
		const minValue = valueAtExponent(
			baseMax,
			ratioMax,
			minExponent,
			stepsPerOctave,
		)

		if (minValue < targetMin) break

		result.unshift(minExponent)
		extra += 1
	}

	return result
}

function getScaleExponents(
	baseMax: number,
	intermediateSteps: number,
): number[] {
	const stepsPerOctave = intermediateSteps + 1
	const min = baseMax * SCALE_MIN_FACTOR
	const max = baseMax * SCALE_MAX_FACTOR
	const exponents: number[] = [0]

	let currentExponent = 0
	let currentValue = baseMax

	while (currentValue > min) {
		currentExponent -= 1
		currentValue = valueAtExponent(
			baseMax,
			REFERENCE_RATIO_MAX,
			currentExponent,
			stepsPerOctave,
		)

		if (currentValue >= min) {
			exponents.unshift(currentExponent)
		}
	}

	currentValue = baseMax
	currentExponent = 0

	while (currentValue < max) {
		currentExponent += 1
		currentValue = valueAtExponent(
			baseMax,
			REFERENCE_RATIO_MAX,
			currentExponent,
			stepsPerOctave,
		)

		if (currentValue <= max) {
			exponents.push(currentExponent)
		}
	}

	return exponents
}

function valueAtExponent(
	base: number,
	ratio: number,
	exponent: number,
	stepsPerOctave: number,
) {
	return base * Math.pow(ratio, exponent / stepsPerOctave)
}
