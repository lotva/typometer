<template>
	<div class="controls-root">
		<label
			for="unit-segments"
			class="label text-metrics-fix has-compensator"
			data-route-transition
		>
			{{ $t('controls.unit.label') }}
		</label>

		<SegmentGroup
			id="unit-segments"
			v-model="unit"
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
				unit: value,
			})
		},
	})
</script>
