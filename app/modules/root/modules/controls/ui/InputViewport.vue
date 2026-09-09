<template>
	<NumberRangeInput
		v-model="range"
		:min="VIEWPORT_BOUNDS.min"
		:max="VIEWPORT_BOUNDS.max"
		:step="10"
		:label="$t('controls.viewport.label')"
		:min-label="$t('controls.viewport.min')"
		:max-label="$t('controls.viewport.max')"
		:unit="$t('controls.px')"
		hotkey="V"
	/>
</template>

<script setup lang="ts">
	import NumberRangeInput from '~/common/ui/NumberRangeInput.vue'
	import { VIEWPORT_BOUNDS } from '~/modules/root/config/setting-bounds'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const range = computed({
		get: (): [number, number] => [
			store.settings.viewportMin,
			store.settings.viewportMax,
		],
		set: ([min, max]) => store.updateViewportRange([min, max]),
	})
</script>
