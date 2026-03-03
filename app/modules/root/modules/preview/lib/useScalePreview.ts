import { useScaleStore } from '../../../model/useScaleStore'
import { categorizeToken } from '../../tokens'

export function useScalePreview() {
	const store = useScaleStore()
	const { locale } = useI18n()

	const categorizedScale = computed(() =>
		store.scale
			.map((value) => ({
				category: categorizeToken(value, store.settings.base).name,
				value,
			}))
			.slice()
			.sort((a, b) => b.value - a.value),
	)

	function capitalize(text: string) {
		return text.charAt(0).toUpperCase() + text.slice(1)
	}

	function isCustomStep(value: number) {
		const index = store.scale.indexOf(value)
		if (index === -1) return false

		return store.settings.customSteps.some((step) => {
			if (step.position === 'between') {
				return step.referenceIndex === index - 1
			}

			if (step.position === 'before') {
				return step.referenceIndex === index
			}

			return false
		})
	}

	function isValueDisabled(value: number) {
		const index = store.scale.indexOf(value)
		if (index === -1) return false

		return store.settings.disabledIndices.has(index)
	}

	function removeCustomStepByValue(value: number) {
		const index = store.scale.indexOf(value)
		if (index !== -1) {
			const customStepIndex = store.settings.customSteps.findIndex((step) => {
				if (step.position === 'between') {
					return step.referenceIndex === index - 1
				}

				if (step.position === 'before') {
					return step.referenceIndex === index
				}

				return false
			})

			if (customStepIndex !== -1) {
				store.removeCustomStep(customStepIndex)
			}
		}
	}

	return {
		capitalize,
		categorizedScale,
		isCustomStep,
		isValueDisabled,
		locale,
		removeCustomStepByValue,
	}
}
