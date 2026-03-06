import type { ITokenContext } from '../model'

import { PREFIX, RECOMMENDED_TOKEN_NAMES } from '../config'
import { findClosestIndex } from './utilities'

export function generateRecommendedTokens(
	context: ITokenContext,
): Record<string, string> {
	const { settings, values } = context
	const base = settings.base
	const unit = settings.unit

	const baseIndex = findClosestIndex(values, base)
	if (baseIndex === -1) return {}

	const snappedBase = values[baseIndex]
	if (snappedBase === undefined) return {}

	const result: Record<string, string> = {}

	const leftValues = values.slice(0, baseIndex)
	if (leftValues.length >= 2) {
		result[`${PREFIX}--label-s`] = `${leftValues[0]}${unit}`
		result[`${PREFIX}--label`] = `${leftValues[1]}${unit}`
	} else if (leftValues.length === 1) {
		result[`${PREFIX}--label`] = `${leftValues[0]}${unit}`
	} else {
		result[`${PREFIX}--label`] = `${snappedBase}${unit}`
	}

	result[`${PREFIX}`] = `${snappedBase}${unit}`

	const rightValues = values
		.slice(baseIndex + 1)
		.filter((v) => v <= snappedBase * 4)
	if (!rightValues.length) return result

	const selected: number[] = []

	const leadIndex = findClosestIndex(
		rightValues,
		Math.max(snappedBase * 1.3, rightValues[0]!),
	)
	selected.push(rightValues[leadIndex]!)

	const headingValues = rightValues.slice(leadIndex + 1)
	const steps = RECOMMENDED_TOKEN_NAMES.length - 1
	const step =
		headingValues.length > 1 ? (headingValues.length - 1) / (steps - 1) : 1

	for (let index = 0; index < steps; index++) {
		const stepIndex = Math.round(index * step)
		if (stepIndex < headingValues.length) {
			selected.push(headingValues[stepIndex]!)
		}
	}

	const names = RECOMMENDED_TOKEN_NAMES.slice(0, selected.length)
	names.forEach((name, index) => {
		result[`${PREFIX}--${name}`] = `${selected[index]}${unit}`
	})

	return result
}
