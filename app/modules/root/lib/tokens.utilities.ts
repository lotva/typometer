import type { TOutputFormat, TUnit } from '../model/types'

import { TOKEN_NAMES, type TTokenConfig } from '../config/token-names'

export interface ITokens {
	full: Record<string, string>
	mobileFirst: Record<string, string>
	recommended: Record<string, string>
}

const CATEGORIES = [
	{ maxRatio: 1, name: 'label', startRatio: 0 },
	{ maxRatio: 1.5, name: 'body', startRatio: 1 },
	{ maxRatio: 2, name: 'accent', startRatio: 1.5 },
	{ maxRatio: undefined, name: 'heading', startRatio: 2 },
] as const

export type TokenCategory = (typeof CATEGORIES)[number]

export function categorizeToken(value: number, baseValue: number) {
	const ratio = value / baseValue

	for (let index = CATEGORIES.length - 1; index >= 0; index--) {
		const category = CATEGORIES[index]!
		if (ratio >= category.startRatio) {
			if (category.maxRatio !== undefined && ratio >= category.maxRatio) {
				continue
			}
			return category
		}
	}

	return CATEGORIES[0]
}

export function generateTokens(
	scaleValues: number[],
	unit: TUnit,
	outputFormat: TOutputFormat,
	baseValue: number,
	disabledIndices: Set<number>,
): ITokens {
	const config = TOKEN_NAMES[outputFormat]
	const enabledScaleValues = scaleValues.filter(
		(_, index) => !disabledIndices.has(index),
	)

	const fullTokens: Record<string, string> = {}
	enabledScaleValues.forEach((value, enabledIndex) => {
		const fullTokenName = getTokenNameByIndex(
			value,
			enabledIndex,
			enabledScaleValues,
			baseValue,
			config,
			outputFormat,
		)
		const cssVariable = fullTokenName
			? `--${config.prefix}--${fullTokenName}`
			: `--${config.prefix}`
		fullTokens[cssVariable] = `${value}${unit}`
	})

	const mobileFirstTokens = { ...fullTokens }

	const recommendedTokens = generateRecommendedTokens(
		enabledScaleValues,
		baseValue,
		unit,
		config,
	)

	return {
		full: fullTokens,
		mobileFirst: mobileFirstTokens,
		recommended: recommendedTokens,
	}
}

function findClosestIndex(values: number[], target: number) {
	if (values.length === 0) return -1

	let closestIndex = 0
	let minDiff = Math.abs(values[0]! - target)

	for (let index = 1; index < values.length; index++) {
		const diff = Math.abs(values[index]! - target)
		if (
			diff < minDiff ||
			(diff === minDiff && values[index]! > values[closestIndex]!)
		) {
			minDiff = diff
			closestIndex = index
		}
	}

	return closestIndex
}

function generateRecommendedTokens(
	values: number[],
	baseValue: number,
	unit: TUnit,
	config: TTokenConfig,
) {
	const baseIndex = findClosestIndex(values, baseValue)
	const baseValueActual = values[baseIndex]!

	const result: Record<string, string> = {}

	const leftValues = values.slice(0, baseIndex)
	if (leftValues.length >= 2) {
		result[`--${config.prefix}--label-s`] = `${leftValues[0]}${unit}`
		result[`--${config.prefix}--label`] = `${leftValues[1]}${unit}`
	} else if (leftValues.length === 1) {
		result[`--${config.prefix}--label`] = `${leftValues[0]}${unit}`
	} else {
		result[`--${config.prefix}--label`] = `${baseValueActual}${unit}`
	}

	result[`--${config.prefix}`] = `${baseValueActual}${unit}`

	const allRightValues = values.slice(baseIndex + 1)
	const maxRecommended = baseValueActual * 4
	const rightValues = allRightValues.filter((v) => v <= maxRecommended)
	const availableCount = rightValues.length

	if (availableCount > 0) {
		const largeNames = [
			'lead',
			'heading-s',
			'heading-m',
			'heading-l',
			'heading-xl',
			'display',
		]

		const tokensToCreate = Math.min(largeNames.length, availableCount)
		const selectedNames = largeNames.slice(0, tokensToCreate)

		if (tokensToCreate === 1) {
			result[`--${config.prefix}--${selectedNames[0]}`] =
				`${rightValues[0]}${unit}`
		} else {
			const step = (availableCount - 1) / (tokensToCreate - 1)

			for (let tokenIndex = 0; tokenIndex < tokensToCreate; tokenIndex++) {
				const valueIndex = Math.round(tokenIndex * step)
				const tokenName = selectedNames[tokenIndex]
				result[`--${config.prefix}--${tokenName}`] =
					`${rightValues[valueIndex]}${unit}`
			}
		}
	}

	return result
}

function getTokenName(
	offset: number,
	config: TTokenConfig,
	centerIndex: number,
) {
	if (offset === 0) return ''

	if (offset > 0) {
		const rightIndex = centerIndex + offset

		if (rightIndex < config.names.length) {
			const name = config.names[rightIndex]
			return name === '' ? '' : (name ?? '')
		}

		const overflowIndex = offset - (config.names.length - centerIndex - 1)
		const lastIndex = config.names.length - 1

		return config.overflowStrategy === 'numeric'
			? `${config.names[lastIndex]}-${overflowIndex + 1}`
			: `${overflowIndex + 1}xl`
	}

	if (offset < 0) {
		const leftIndex = centerIndex + offset

		if (leftIndex >= 0) {
			const name = config.names[leftIndex]
			return name === '' ? '' : (name ?? '')
		}

		const overflowIndex = Math.abs(offset) - centerIndex

		return config.overflowStrategy === 'numeric'
			? `${config.names[0]}-${overflowIndex}`
			: `${overflowIndex + 1}xs`
	}

	return ''
}

function getTokenNameByIndex(
	value: number,
	index: number,
	scaleValues: number[],
	baseValue: number,
	config: TTokenConfig,
	outputFormat: TOutputFormat,
) {
	if (outputFormat === 'numeric') {
		return String(index + 1)
	}

	if (outputFormat === 'semantic') {
		const category = categorizeToken(value, baseValue)
		if (!category) return ''

		const categoryTokens = scaleValues.filter(
			(v) => categorizeToken(v, baseValue)?.name === category.name,
		)
		const categoryIndex = categoryTokens.indexOf(value)

		if (categoryTokens.length === 1) {
			return category.name
		}

		return `${category.name}-${categoryIndex + 1}`
	}

	const centerIndex = config.names.findIndex((name) => name === '')
	const offset = index - findClosestIndex(scaleValues, baseValue)

	return getTokenName(offset, config, centerIndex)
}
