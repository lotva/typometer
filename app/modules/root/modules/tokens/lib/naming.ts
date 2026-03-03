import type { TTokenConfig } from '../config'
import type { ITokenContext } from '../model'

import { categorizeToken, findClosestIndex } from './utilities'

export function getTokenNameByIndex(index: number, context: ITokenContext) {
	const { config, outputFormat, settings, values } = context
	const base = settings.base
	const value = values[index]

	if (value === undefined) return ''

	if (outputFormat === 'numeric') {
		return String(index + 1)
	}

	if (outputFormat === 'semantic') {
		const category = categorizeToken(value, base)
		if (!category) return ''

		const sameCategory = values.filter(
			(v) => categorizeToken(v, base)?.name === category.name,
		)
		const catIndex = sameCategory.indexOf(value)
		return sameCategory.length === 1
			? category.name
			: `${category.name}-${catIndex + 1}`
	}

	const centerIndex = config.names.findIndex((n) => n === '')
	const baseIndex = findClosestIndex(values, base)
	const offset = index - baseIndex

	return getTokenName(offset, config, centerIndex)
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

		const overflow = offset - (config.names.length - centerIndex - 1)
		const last = config.names.length - 1

		return config.overflowStrategy === 'numeric'
			? `${config.names[last]}-${overflow + 1}`
			: `${overflow + 1}xl`
	} else {
		const leftIndex = centerIndex + offset

		if (leftIndex >= 0) {
			const name = config.names[leftIndex]
			return name === '' ? '' : (name ?? '')
		}

		const overflow = Math.abs(offset) - centerIndex

		return config.overflowStrategy === 'numeric'
			? `${config.names[0]}-${overflow}`
			: `${overflow + 1}xs`
	}
}
