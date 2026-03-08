<template>
	<div class="sidebar box">
		<header class="header">
			<div class="masthead">
				<h1
					class="title"
					data-route-transition
				>
					{{ $t('title') }}
				</h1>

				<p
					class="tagline"
					data-route-transition
				>
					{{ $t('description') }}
				</p>

				<hr class="divider" />
			</div>

			<LocaleSwitcher />
		</header>

		<Drawer class="drawer">
			<Controls class="controls" />

			<Copy class="copy" />
		</Drawer>
	</div>
</template>

<script setup lang="ts">
	import LocaleSwitcher from '~/common/ui/LocaleSwitcher.vue'
	import Controls from '~/modules/root/modules/controls/Controls.vue'

	import Copy from './Copy.vue'
	import Drawer from './Drawer.vue'
</script>

<style scoped>
	.sidebar {
		display: contents;

		@media (--desktop) {
			scrollbar-color: var(--color__border) transparent;
			scrollbar-width: thin;
			scroll-padding-block-start: 200px;

			overflow: auto;
			overscroll-behavior: contain;
			display: block;

			block-size: 100dvb;
			padding: 0 var(--container-padding-inline) var(--container-padding-block);

			transition: box-shadow var(--animation__duration--fast)
				var(--animation__ease-in-out);
		}
	}

	.header {
		display: flex;
		align-items: last baseline;
		justify-content: space-between;

		padding-block: calc(var(--gap) * 1) calc(var(--gap) * 0.75);
		padding-inline: var(--container-padding-inline);

		background-color: var(--color__background);

		@media (--desktop) {
			display: contents;
			padding: 0;
			border-block-end: none;
		}
	}

	.masthead {
		@media (--desktop) {
			position: sticky;
			z-index: 1;
			inset-block-start: 0;

			margin-inline: calc(-1 * var(--container-padding-inline));
			padding-block-start: var(--container-padding-block);
			padding-inline: var(--container-padding-inline);

			background-color: var(--color__background);
		}
	}

	.title {
		font-size: 1rem;

		@media (--desktop) {
			font-size: 2em;
			letter-spacing: var(--typography__tracking--tight);
		}
	}

	.tagline {
		margin-block-start: calc(var(--gap) * 1.5);
		line-height: var(--typography__leading--tight);
		color: var(--color__foreground--subtitle);

		@media (--mobile) {
			position: absolute;

			overflow: hidden;

			inline-size: 1px;
			block-size: 1px;
			margin: -1px;
			padding: 0;
			border: 0;

			white-space: nowrap;

			clip-path: inset(50%);
		}
	}

	.divider {
		display: none;
		margin-block-start: calc(var(--gap) * 2);

		@media (--desktop) {
			display: block;
		}
	}

	.drawer {
		order: 1;
	}

	.controls {
		@media (--desktop) {
			margin-block-start: calc(var(--gap) * 2);
		}
	}

	.copy {
		margin-block-start: calc(var(--gap) * 2);
	}

	.switcher {
		position: relative;
		font-size: 0.875em;

		@media (--desktop) {
			position: absolute;
			inset-block-start: calc(var(--gap) * 1);
			inset-inline-end: calc(var(--gap) * 1);
			font-size: 1em;
		}
	}
</style>
