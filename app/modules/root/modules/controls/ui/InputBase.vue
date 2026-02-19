<template>
	<NumberInput
		:model-value="baseLocalized"
		:step="step"
		:min="min"
		:max="max"
		:label="`${$t('controls.base')}, ${$t('controls.' + store.settings.unit)}`"
		hotkey="B"
		@value-change="updateBase"
	/>
</template>

<script setup lang="ts">
	import type { NumberInputValueChangeDetails } from '@ark-ui/vue'

	import { useLocalizedNumber } from '~/common/lib/useLocalizedNumber'
	import { withValidation } from '~/common/lib/withValidation'
	import NumberInput from '~/common/ui/NumberInput.vue'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const step = computed(() => (store.settings.unit === 'px' ? 1 : 0.1))
	const min = computed(() => (store.settings.unit === 'px' ? 12 : 1))
	const max = computed(() => (store.settings.unit === 'px' ? 72 : 6))

	const baseLocalized = useLocalizedNumber(() => store.settings.base)

	const updateBase = withValidation(
		(details: NumberInputValueChangeDetails) => {
			store.updateBase(details.valueAsNumber, store.settings.unit)
		},
		{
			max: () => max.value,
			min: () => min.value,
		},
	)
</script>
