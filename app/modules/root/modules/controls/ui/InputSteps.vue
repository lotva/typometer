<template>
	<NumberInput
		v-model="steps"
		class="input-steps"
		:min="STEPS_BOUNDS.min"
		:max="STEPS_BOUNDS.max"
		:label="$t('controls.steps')"
		hotkey="S"
	/>
</template>

<script setup lang="ts">
	import NumberInput from '~/common/ui/NumberInput.vue'
	import { STEPS_BOUNDS } from '~/modules/root/config/setting-bounds'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const steps = computed({
		get: () => String(store.settings.intermediateSteps),
		set: (value: string) => {
			store.updateIntermediateSteps(Number(value))
		},
	})
</script>

<style scoped>
	.input-steps:deep([data-part='control']) {
		inline-size: calc(50% - var(--gap) / 4);
	}
</style>
