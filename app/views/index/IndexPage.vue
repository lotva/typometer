<template>
	<main class="layout">
		<Sidebar />

		<div class="content"><Preview /></div>
	</main>
</template>

<script setup lang="ts">
	import { Preview } from '~/modules/root'

	import Sidebar from './ui/Sidebar.vue'
</script>

<style scoped>
	.layout {
		--container-padding-block: calc(var(--gap) * 5);
		--container-padding-inline: var(--gap);

		display: flex;
		flex-direction: column;

		@media (--desktop) {
			display: grid;
			grid-template-columns: 19em auto;
			min-block-size: 100dvb;
		}
	}

	.content {
		margin-block-end: auto;

		@media (--desktop) {
			min-inline-size: 0;
			block-size: 100dvb;
			padding: var(--container-padding-block) var(--container-padding-inline)
				calc(var(--container-padding-block) + var(--gap))
				clamp(calc(var(--gap) * 1), 4vi, calc(var(--gap) * 5));
		}
	}
</style>
