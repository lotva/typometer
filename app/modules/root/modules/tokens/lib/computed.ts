import type { ITokenContext } from '../model'

import { getTokenNameByIndex } from './naming'
import { findClosestIndex } from './utilities'

export function generateComputedTokens(context: ITokenContext) {
	const { settings, values } = context
	const base = settings.base
	const ratio = settings.ratio
	const steps = settings.intermediateSteps
	const unit = settings.unit

	const baseIndex = findClosestIndex(values, base)
	if (baseIndex === -1) return {}

	const result: Record<string, string> = {
		'--base': `${base}${unit}`,
		'--ratio': String(ratio),
		'--step': 'calc(1 / (var(--steps) + 1))',
		'--steps': String(steps),
	}

	values.forEach((_, index) => {
		const name = getTokenNameByIndex(index, context)
		if (!name) return

		const offset = index - baseIndex
		const variableName = `--${name}`

		result[variableName] =
			offset === 0
				? 'var(--base)'
				: `calc(var(--base) * pow(var(--ratio), ${offset} * var(--step)))`
	})

	return result
}
