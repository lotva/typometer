<template>
	<main class="layout">
		<div class="sidebar">
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
		position: sticky;
		inset-block-start: 0;

		max-inline-size: 28ch;
		block-size: 100dvb;
		padding: calc(var(--gap) * 5) calc(var(--gap));
	}

	.content {
		padding: calc(var(--gap) * 5) calc(var(--gap));
	}
</style>
