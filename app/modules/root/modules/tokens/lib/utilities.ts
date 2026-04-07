import { CATEGORIES, type TTokenCategory } from '../config'

export function categorizeToken(value: number, base: number): TTokenCategory {
	const ratio = value / base

	for (const category of CATEGORIES.slice().reverse()) {
		if (ratio >= category.startRatio) {
			if (category.maxRatio !== undefined && ratio >= category.maxRatio) {
				continue
			}

			return category
		}
	}

	return CATEGORIES[0]
}

export function findClosestIndex(values: number[], target: number) {
	if (values.length === 0 || values[0] === undefined) return -1

	let closestIndex = 0
	let minDiff = Math.abs(values[0] - target)

	values.slice(1).forEach((value, index) => {
		const diff = Math.abs(value - target)
		if (diff < minDiff) {
			minDiff = diff
			closestIndex = index + 1
		}
	})

	return closestIndex
}

export const format = (n: number, precision = 3): string =>
	parseFloat(n.toFixed(precision)).toString()
