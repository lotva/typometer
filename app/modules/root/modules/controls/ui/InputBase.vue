<template>
	<NumberInput
		:model-value="baseLocalized"
		:step="1"
		:min="12"
		:max="72"
		:label="`${$t('controls.base')}, ${$t('controls.px')}`"
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

	const baseLocalized = useLocalizedNumber(() => store.settings.base)

	const updateBase = withValidation(
		(details: NumberInputValueChangeDetails) => {
			store.updateBase(details.valueAsNumber)
		},
		{
			max: () => 72,
			min: () => 12,
		},
	)
</script>
