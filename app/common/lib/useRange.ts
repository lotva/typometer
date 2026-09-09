import type { NumberInputValueChangeDetails } from '@ark-ui/vue'

import { withValidation } from './withValidation'

export function useRange(options: {
	get: () => [number, number]
	max: number
	min: number
	set: (range: [number, number]) => void
}) {
	const updateMin = withValidation(
		(details: NumberInputValueChangeDetails) => {
			const [, currentMax] = options.get()
			options.set([details.valueAsNumber, currentMax])
		},
		{
			max: options.max,
			min: options.min,
		},
	)

	const updateMax = withValidation(
		(details: NumberInputValueChangeDetails) => {
			const [currentMin] = options.get()
			options.set([currentMin, details.valueAsNumber])
		},
		{
			max: options.max,
			min: options.min,
		},
	)

	return { updateMax, updateMin }
}
