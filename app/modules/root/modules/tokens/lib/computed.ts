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
	if (baseIndex === -1) return { root: {}, 'width < 768px': {} }

	const root: Record<string, string> = {
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

		root[variableName] =
			offset === 0
				? 'var(--base)'
				: `calc(var(--base) * pow(var(--ratio), ${offset} * var(--step)))`
	})

	const mobileRatio = computeMobileRatio(ratio)

	const mobile: Record<string, string> = {
		'--ratio': String(mobileRatio),
	}

	return {
		root,
		'width < 768px': mobile,
	}
}

function computeMobileRatio(originalRatio: number) {
	if (originalRatio <= 1) return originalRatio

	const MAX_REDUCTION = 0.3
	const POWER = 1.5
	const delta = Math.min(
		MAX_REDUCTION,
		Math.pow(originalRatio - 1, POWER) * MAX_REDUCTION,
	)

	const mobile = originalRatio - delta
	return Math.max(1, parseFloat(mobile.toFixed(2)))
}
