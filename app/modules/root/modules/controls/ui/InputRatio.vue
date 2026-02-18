<template>
	<NumberInput
		:model-value="ratioLocalized"
		:step="0.1"
		:min="1.1"
		:max="10"
		:label="$t('controls.ratio')"
		@value-change="
			(details) => store.updateSettings({ ratio: details.valueAsNumber })
		"
	/>
</template>

<script setup lang="ts">
	import { useLocalizedNumber } from '~/common/lib/useLocalizedNumber'
	import NumberInput from '~/common/ui/NumberInput.vue'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const ratioLocalized = useLocalizedNumber(() => store.settings.ratio)
</script>
