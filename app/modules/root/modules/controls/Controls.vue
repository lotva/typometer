<template>
	<section :aria-label="$t('controls.ariaLabel')">
		<hgroup class="hgroup">
			<h1
				class="title"
				data-route-transition
			>
				{{ $t('title') }}
			</h1>

			<p
				class="description"
				data-route-transition
			>
				{{ $t('description') }}
			</p>

			<hr class="divider" />
		</hgroup>

		<ControlsList />
	</section>
</template>

<script setup lang="ts">
	import ControlsList from './ui/ControlsList.vue'
</script>

<style scoped>
	.hgroup {
		position: sticky;
		z-index: 1;
		inset-block-start: 0;

		margin-inline: calc(-1 * var(--container-padding-inline));
		padding-block-start: var(--container-padding-block);
		padding-inline: var(--container-padding-inline);

		background-color: var(--color__background);
	}

	.title {
		letter-spacing: var(--typography__tracking--tight);
	}

	.description {
		margin-block-start: calc(var(--gap) * 1.5);
		color: var(--color__foreground--subtitle);
	}

	.divider {
		margin-block-start: calc(var(--gap) * 2);
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
