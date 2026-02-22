<template>
	<div class="controls-root">
		<span
			id="unit-label"
			class="label text-metrics-fix has-compensator"
			data-route-transition
		>
			{{ $t('controls.unit.label') }}
		</span>

		<SegmentGroup
			v-model="unit"
			aria-labelledby="unit-label"
			class="controls-content"
			:items="[
				{ label: $t('controls.unit.pixel'), value: 'px' },
				{ label: $t('controls.unit.em'), value: 'em' },
			]"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { TUnit } from '~/modules/root/model/types'

	import SegmentGroup from '~/common/ui/SegmentGroup.vue'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const unit = computed({
		get: () => store.settings.unit,
		set: (value: TUnit) => {
			store.updateSettings({
				base: store.settings.baseByUnit[value],
				gridStep: store.settings.gridStepByUnit[value],
				unit: value,
			})
		},
	})
</script>
