<template>
	<main class="layout">
		<div
			v-save-scroll
			class="sidebar"
		>
			<Controls />
		</div>

		<div class="content"><Preview /></div>
	</main>
</template>

<script setup lang="ts">
	import { Controls, Preview } from '~/modules/root'
</script>

<style scoped>
	.layout {
		display: grid;
		grid-template-columns: 28ch auto;
	}

	.sidebar {
		--container-padding-inline: var(--gap);
		--container-padding-block: calc(var(--gap) * 5);

		scrollbar-color: var(--color__border) transparent;
		scrollbar-width: thin;

		position: sticky;
		inset-block-start: 0;

		overflow: auto;
		overscroll-behavior: contain;

		block-size: 100dvb;
		padding: 0 var(--container-padding-inline) var(--container-padding-block);
	}

	.content {
		padding: calc(var(--gap) * 5) calc(var(--gap));
	}
</style>
