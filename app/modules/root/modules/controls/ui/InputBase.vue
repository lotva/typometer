<template>
	<NumberRangeInput
		v-model="range"
		:min="BASE_BOUNDS.min"
		:max="BASE_BOUNDS.max"
		:step="1"
		:label="$t('controls.base.label')"
		:min-label="$t('controls.base.min')"
		:max-label="$t('controls.base.max')"
		:unit="$t('controls.px')"
		hotkey="B"
	/>
</template>

<script setup lang="ts">
	import NumberRangeInput from '~/common/ui/NumberRangeInput.vue'
	import { BASE_BOUNDS } from '~/modules/root/config/setting-bounds'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const range = computed({
		get: (): [number, number] => [
			store.settings.baseMin,
			store.settings.baseMax,
		],
		set: ([min, max]) => store.updateBaseRange([min, max]),
	})
</script>
