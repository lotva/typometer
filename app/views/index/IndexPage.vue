<template>
	<main class="layout">
		<div
			v-save-scroll
			class="sidebar box"
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
		--container-padding-inline: var(--gap);

		display: grid;
		grid-template-columns: 28ch auto;
	}

	.sidebar,
	.content {
		block-size: 100dvb;
	}

	.sidebar {
		scrollbar-color: var(--color__border) transparent;
		scrollbar-width: thin;

		position: sticky;
		inset-block-start: 0;

		overflow: auto;
		overscroll-behavior: contain;

		padding: 0 var(--container-padding-inline) var(--container-padding-block);

		transition: box-shadow var(--animation__duration--fast)
			var(--animation__ease-in-out);
	}

	.content {
		padding: var(--container-padding-block) var(--container-padding-inline)
			calc(var(--container-padding-block) + var(--gap)) calc(var(--gap) * 5);
	}
</style>
