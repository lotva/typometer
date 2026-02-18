<template>
	<section
		class="section"
		:aria-label="$t('controls.ariaLabel')"
	>
		<InputBase />

		<InputRatio />

		<InputUnit />

		<InputSteps />

		<InputGrid />

		<InputOutputFormat />

		<Presets />
	</section>
</template>

<script setup lang="ts">
	import InputBase from './ui/InputBase.vue'
	import InputGrid from './ui/InputGrid.vue'
	import InputOutputFormat from './ui/InputOutputFormat.vue'
	import InputRatio from './ui/InputRatio.vue'
	import InputSteps from './ui/InputSteps.vue'
	import InputUnit from './ui/InputUnit.vue'
	import Presets from './ui/Presets.vue'
</script>

<style scoped>
	.section {
		display: grid;
		row-gap: calc(var(--gap) * 2);
	}

	.list {
		margin-block-start: calc(var(--gap) * 2);
	}

	:deep() {
		.controls-root {
			display: grid;
			row-gap: var(--gap);
		}

		.controls-content {
			font-size: 1.25em;
		}
	}
</style>
