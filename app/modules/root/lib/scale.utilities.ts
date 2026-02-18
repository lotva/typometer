import type { ICustomStep, IScalePoint, ISettings } from '../model/types'

export function convert(
	value: number,
	fromUnit: ISettings['unit'],
	toUnit: ISettings['unit'],
) {
	if (fromUnit === 'px' && toUnit === 'em') {
		return value / 16
	}

	if (fromUnit === 'em' && toUnit === 'px') {
		return value * 16
	}

	return value
}

export function generateRawScale(
	settings: Pick<ISettings, 'base' | 'intermediateSteps' | 'ratio' | 'unit'>,
): IScalePoint[] {
	const { base, intermediateSteps, ratio } = settings
	const stepsPerOctave = intermediateSteps + 1
	const result: IScalePoint[] = []

	const [min, max] = [base * 0.7, base * 6.5]

	let currentValue = base
	let currentExponent = 0

	if (base >= min && base <= max) {
		result.push({ exponent: 0, value: base })
	}

	while (currentValue > min) {
		currentExponent -= 1
		currentValue = base * Math.pow(ratio, currentExponent / stepsPerOctave)

		if (currentValue >= min) {
			result.unshift({ exponent: currentExponent, value: currentValue })
		}
	}

	currentValue = base
	currentExponent = 0

	while (currentValue < max) {
		currentExponent += 1
		currentValue = base * Math.pow(ratio, currentExponent / stepsPerOctave)

		if (currentValue <= max) {
			result.push({ exponent: currentExponent, value: currentValue })
		}
	}

	return result
}

export function mergeScaleWithCustomSteps(
	rawScale: IScalePoint[],
	customSteps: ICustomStep[],
	settings: Pick<ISettings, 'base' | 'intermediateSteps' | 'ratio' | 'unit'>,
): IScalePoint[] {
	const result = [...rawScale]
	const { base, intermediateSteps, ratio, unit } = settings
	const stepsPerOctave = intermediateSteps + 1

	for (const customStep of customSteps) {
		const { offsetExponent, position, referenceIndex } = customStep

		let insertIndex = referenceIndex
		let targetExponent = 0

		switch (position) {
			case 'after': {
				insertIndex = result.length
				targetExponent =
					(rawScale[rawScale.length - 1]?.exponent ?? 0) + offsetExponent

				break
			}
			case 'before': {
				insertIndex = referenceIndex
				targetExponent =
					rawScale[referenceIndex]?.exponent ?? 0 - offsetExponent

				break
			}
			case 'between': {
				insertIndex = referenceIndex + 1
				const leftExponent = rawScale[referenceIndex]?.exponent ?? 0
				const rightExponent =
					rawScale[referenceIndex + 1]?.exponent ?? leftExponent + 1
				targetExponent =
					leftExponent + offsetExponent * (rightExponent - leftExponent)

				break
			}
			// No default
		}

		let value = base * Math.pow(ratio, targetExponent / stepsPerOctave)
		value = round(value, unit)

		result.splice(insertIndex, 0, { exponent: targetExponent, value })
	}

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
