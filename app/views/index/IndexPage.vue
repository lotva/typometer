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
		display: flex;
	}

	.sidebar {
		--container-padding-inline: var(--gap);

		scrollbar-color: var(--color__border) transparent;
		scrollbar-width: thin;

		position: sticky;
		inset-block-start: 0;

		overflow: auto;
		overscroll-behavior: contain;

		max-inline-size: 28ch;
		block-size: 100dvb;
		padding: calc(var(--gap) * 5) var(--container-padding-inline);
	}

	.content {
		padding: calc(var(--gap) * 5) calc(var(--gap));
	}
</style>
