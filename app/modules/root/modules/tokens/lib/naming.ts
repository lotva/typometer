import type { ITokenContext } from '../model'

import { TOKEN_NAMES_BY_OUTPUT_FORMAT } from '../config'
import { categorizeToken, findClosestIndex } from './utilities'

export function getTokenNameByIndex(index: number, context: ITokenContext) {
	const { outputFormat, settings, values } = context

	const value = values[index]
	if (value === undefined) return ''

	switch (outputFormat) {
		case 'numeric':
			return String(index + 1)
		case 'semantic':
			return getSemanticTokenName(value, values, settings.base)
		case 'tshirt':
			return getTshirtTokenName(index, values, settings.base)
		default:
			return ''
	}
}

function generateTshirtName(offset: number, centerIndex: number) {
	const names = TOKEN_NAMES_BY_OUTPUT_FORMAT.tshirt
	if (offset === 0) return names[centerIndex] ?? ''

	if (offset > 0) {
		const rightIndex = centerIndex + offset
		if (rightIndex < names.length) {
			const name = names[rightIndex]
			return name === '' ? '' : (name ?? '')
		}
		const overflow = offset - (names.length - centerIndex - 1)
		return `${overflow + 1}xl`
	}

	const leftIndex = centerIndex + offset
	if (leftIndex >= 0) {
		const name = names[leftIndex]
		return name === '' ? '' : (name ?? '')
	}

	const overflow = Math.abs(offset) - centerIndex
	return `${overflow + 1}xs`
}

function getSemanticTokenName(value: number, values: number[], base: number) {
	const category = categorizeToken(value, base)
	if (!category) return ''

	const sameCategory = values.filter(
		(v) => categorizeToken(v, base)?.name === category.name,
	)
	const categoryIndex = sameCategory.indexOf(value)

	return sameCategory.length === 1
		? category.name
		: `${category.name}-${categoryIndex + 1}`
}

function getTshirtTokenName(index: number, values: number[], base: number) {
	const centerIndex = TOKEN_NAMES_BY_OUTPUT_FORMAT.tshirt.findIndex(
		(name) => name === 'm',
	)
	const baseIndex = findClosestIndex(values, base)
	const offset = index - baseIndex

	return generateTshirtName(offset, centerIndex)
}
