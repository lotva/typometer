import type { NumberInputValueChangeDetails } from '@ark-ui/vue'

export function withValidation<T extends NumberInputValueChangeDetails>(
	handler: (details: T) => void,
	rules: {
		max?: (() => number) | number
		min?: (() => number) | number
		validate?: (value: number) => boolean
	},
) {
	return (details: T) => {
		const { valueAsNumber } = details

		const min = typeof rules.min === 'function' ? rules.min() : rules.min
		const max = typeof rules.max === 'function' ? rules.max() : rules.max

		if (Number.isNaN(valueAsNumber)) return
		if (min !== undefined && valueAsNumber < min) return
		if (max !== undefined && valueAsNumber > max) return
		if (rules.validate && !rules.validate(valueAsNumber)) return

		handler(details)
	}
}
