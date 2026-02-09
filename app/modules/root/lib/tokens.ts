import type { TOutputFormat, TUnit } from '../model/types'

import { TOKEN_NAMES, type TTokenConfig } from '../modules/config/token-names'

export function findClosestIndexSorted(values: number[], target: number) {
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

export function generateTokens(
	scaleValues: number[],
	unit: TUnit,
	outputFormat: TOutputFormat,
	baseValue: number,
): Record<string, string> {
	const config = TOKEN_NAMES[outputFormat]
	const centerIndex = config.names.findIndex((name) => name === '')

	const baseIndex = findClosestIndexSorted(scaleValues, baseValue)
	if (baseIndex === -1) {
		throw new Error(`Base value ${baseValue} not found in scale values`)
	}

	const tokens: Record<string, string> = {}

	scaleValues.forEach((value, index) => {
		const offset = index - baseIndex
		const tokenName = getTokenName(offset, config, centerIndex)

		let cssVariable: string
		if (outputFormat === 'semantic') {
			cssVariable = tokenName === '' ? '--font-size' : `--${tokenName}`
		} else {
			cssVariable =
				tokenName === '' ? '--font-size' : `--${config.prefix}${tokenName}`
		}

		tokens[cssVariable] = `${value}${unit}`
	})

	return tokens
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
			return name === '' ? '' : name
		}

		const overflowIndex = offset - (config.names.length - centerIndex - 1)

		return config.overflowStrategy === 'numeric'
			? `${config.names[config.names.length - 1]}-${overflowIndex}`
			: `${overflowIndex + 1}xl`
	}

	if (offset < 0) {
		const leftIndex = centerIndex + offset

		if (leftIndex >= 0) {
			const name = config.names[leftIndex]
			return name === '' ? '' : name
		}

		const overflowIndex = Math.abs(offset) - centerIndex

		return config.overflowStrategy === 'numeric'
			? `${config.names[0]}-${overflowIndex + 1}`
			: `${overflowIndex + 1}xs`
	}

	return ''
}
