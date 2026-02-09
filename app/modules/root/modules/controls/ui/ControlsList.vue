<template>
	<div class="list">
		<InputBase />

		<InputRatio />

		<InputUnit />

		<InputSteps />

		<InputGrid />

		<Presets />
	</div>
</template>

<script setup lang="ts">
	import InputBase from './InputBase.vue'
	import InputGrid from './InputGrid.vue'
	import InputRatio from './InputRatio.vue'
	import InputSteps from './InputSteps.vue'
	import InputUnit from './InputUnit.vue'
	import Presets from './Presets.vue'
</script>

<style scoped>
	.list {
		display: grid;
		row-gap: calc(var(--gap) * 2);
	}
</style>

<style>
	.controls-root {
		display: grid;
		row-gap: var(--gap);
	}

	.controls-control {
		font-size: 1.25em;
	}
</style>
