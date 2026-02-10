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
		--container-padding-block: calc(var(--gap) * 5);

		display: grid;
		grid-template-columns: 28ch auto;
	}

	.sidebar {
		--container-padding-inline: var(--gap);

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
		padding: var(--container-padding-block) var(--gap) calc(var(--gap) * 4.65)
			calc(var(--gap) * 4);
	}
</style>
