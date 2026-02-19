<template>
	<NumberInput
		v-model="steps"
		:focus-input-on-change="false"
		allow-mouse-wheel
		:min="0"
		:max="5"
		:label="$t('controls.steps')"
	/>
</template>

<script setup lang="ts">
	import NumberInput from '~/common/ui/NumberInput.vue'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const steps = computed({
		get: () => String(store.settings.intermediateSteps),
		set: (value: string) => {
			store.updateIntermediateSteps(Number(value))
		},
	})
</script>
