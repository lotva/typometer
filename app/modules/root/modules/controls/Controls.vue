<template>
	<section
		class="section"
		:aria-label="$t('controls.ariaLabel')"
	>
		<SliderViewport class="slider" />

		<InputViewport />

		<InputBase />

		<InputRatio />

		<InputSteps />

		<InputGrid />

		<InputFormat />

		<Presets />
	</section>
</template>

<script setup lang="ts">
	import { SliderViewport } from '../preview'
	import InputBase from './ui/InputBase.vue'
	import InputFormat from './ui/InputFormat.vue'
	import InputGrid from './ui/InputGrid.vue'
	import InputRatio from './ui/InputRatio.vue'
	import InputSteps from './ui/InputSteps.vue'
	import InputViewport from './ui/InputViewport.vue'
	import Presets from './ui/Presets.vue'
</script>

<style scoped>
	.section {
		display: grid;
		row-gap: calc(var(--gap) * 2);

		.slider {
			@media (--desktop) {
				display: none;
			}
		}
	}
</style>
