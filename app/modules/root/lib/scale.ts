import type { IScalePoint, ISettings } from '../model/types'

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
) {
	const { base, intermediateSteps, ratio } = settings
	const stepsPerOctave = intermediateSteps + 1
	const result: IScalePoint[] = []

	const [min, max] = [base * 0.65, base * 6.25]

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
	settings: Pick<
		ISettings,
		'base' | 'customSteps' | 'intermediateSteps' | 'ratio' | 'unit'
	>,
) {
	if (!settings.customSteps.length) {
		return rawScale
	}

	const result = [...rawScale]
	const { base, customSteps, intermediateSteps, ratio, unit } = settings
	const stepsPerOctave = intermediateSteps + 1

	for (const { offsetExponent, position, referenceIndex } of customSteps) {
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
