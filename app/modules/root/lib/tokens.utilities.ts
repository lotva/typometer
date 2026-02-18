import type { TOutputFormat, TUnit } from '../model/types'

import { TOKEN_NAMES, type TTokenConfig } from '../config/token-names'

export interface ITokens {
	full: Record<string, string>
	mobileFirst: Record<string, string>
	recommended: Record<string, string>
}

const RECOMMENDED_RATIOS = [0.75, 1, 1.25, 1.5, 2, 2.5, 3, 3.5, 4, 4.5]

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

	const recommendedScaleValues = enabledScaleValues.filter((value) => {
		const ratio = value / baseValue
		return RECOMMENDED_RATIOS.some((r) => Math.abs(ratio - r) < 0.2)
	})

	const fullTokens: Record<string, string> = {}
	const recommendedTokens: Record<string, string> = {}
	const mobileFirstTokens: Record<string, string> = {}

	enabledScaleValues.forEach((value, enabledIndex) => {
		const fullTokenName = getFullTokenName(
			value,
			enabledIndex,
			enabledScaleValues,
			baseValue,
			config,
			outputFormat,
		)

		const cssVariable = fullTokenName
			? `--${config.prefix}${fullTokenName ? '--' : ''}${fullTokenName}`
			: `--${config.prefix}`

		fullTokens[cssVariable] = `${value}${unit}`
		mobileFirstTokens[cssVariable] = `${value}${unit}`
	})

	recommendedScaleValues.forEach((value) => {
		const recommendedIndex = recommendedScaleValues.indexOf(value)

		const recommendedTokenName = getRecommendedTokenName(
			value,
			recommendedIndex,
			recommendedScaleValues,
			baseValue,
			config,
			outputFormat,
		)

		if (recommendedTokenName) {
			const recommendedCssVariable = recommendedTokenName
				? `--${config.prefix}${recommendedTokenName ? '--' : ''}${recommendedTokenName}`
				: `--${config.prefix}`

			recommendedTokens[recommendedCssVariable] = `${value}${unit}`
		}
	})

	return {
		full: fullTokens,
		mobileFirst: mobileFirstTokens,
		recommended: recommendedTokens,
	}
}

function findClosestIndex(values: number[], target: number) {
	if (values.length === 0) return -1

	if (target <= values[0]!) return 0

	if (target >= values[values.length - 1]!) return values.length - 1

	for (let index = 0; index < values.length - 1; index++) {
		const current = values[index]
		const next = values[index + 1]

		if (current === target) return index
		if (next === target) return index + 1

		if (current! < target && target < next!) {
			const diff1 = target - current!
			const diff2 = next! - target
			return diff1 <= diff2 ? index : index + 1
		}
	}

	return values.length - 1
}

function getFullTokenName(
	value: number,
	index: number,
	scaleValues: number[],
	baseValue: number,
	config: TTokenConfig,
	outputFormat: TOutputFormat,
) {
	return getTokenNameByIndex(
		value,
		index,
		scaleValues,
		baseValue,
		config,
		outputFormat,
	)
}

function getRecommendedTokenName(
	value: number,
	index: number,
	scaleValues: number[],
	baseValue: number,
	config: TTokenConfig,
	outputFormat: TOutputFormat,
) {
	return getTokenNameByIndex(
		value,
		index,
		scaleValues,
		baseValue,
		config,
		outputFormat,
	)
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
