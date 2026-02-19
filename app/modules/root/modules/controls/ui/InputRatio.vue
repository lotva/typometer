<template>
	<NumberInput
		:model-value="ratioLocalized"
		:step="0.1"
		:min="min"
		:max="max"
		:label="$t('controls.ratio')"
		@value-change="updateRatio"
	/>
</template>

<script setup lang="ts">
	import type { NumberInputValueChangeDetails } from '@ark-ui/vue'

	import { useLocalizedNumber } from '~/common/lib/useLocalizedNumber'
	import { withValidation } from '~/common/lib/withValidation'
	import NumberInput from '~/common/ui/NumberInput.vue'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const ratioLocalized = useLocalizedNumber(() => store.settings.ratio)

	const min = 1.1
	const max = 10

	const updateRatio = withValidation(
		(details: NumberInputValueChangeDetails) => {
			store.updateSettings({ ratio: details.valueAsNumber })
		},
		{
			max: () => max,
			min: () => min,
		},
	)
</script>
