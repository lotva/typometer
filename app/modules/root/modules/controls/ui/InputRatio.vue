<template>
	<NumberRangeInput
		v-model="range"
		:min="RATIO_BOUNDS.min"
		:max="RATIO_BOUNDS.max"
		:step="0.01"
		:label="$t('controls.ratio.label')"
		:min-label="$t('controls.ratio.min')"
		:max-label="$t('controls.ratio.max')"
		hotkey="R"
	/>
</template>

<script setup lang="ts">
	import NumberRangeInput from '~/common/ui/NumberRangeInput.vue'
	import { RATIO_BOUNDS } from '~/modules/root/config/setting-bounds'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const range = computed({
		get: (): [number, number] => [
			store.settings.ratioMin,
			store.settings.ratioMax,
		],
		set: ([min, max]) => store.updateRatioRange([min, max]),
	})
</script>
