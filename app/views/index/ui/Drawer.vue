<template>
	<div
		id="drawer"
		ref="drawerRef"
		class="drawer"
	>
		<button
			ref="handleRef"
			class="handle"
			type="button"
			:aria-label="isExpanded ? $t('panel.collapse') : $t('panel.expand')"
			:aria-expanded="isExpanded"
			aria-controls="drawer"
		></button>

		<div
			ref="contentRef"
			class="content"
		>
			<slot></slot>

			<div
				ref="spacerRef"
				class="spacer"
			></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useDrawer } from '../lib/useDrawer'

	const drawerRef = ref<HTMLElement | null>(null)
	const handleRef = ref<HTMLElement | null>(null)
	const contentRef = ref<HTMLElement | null>(null)
	const spacerRef = ref<HTMLElement | null>(null)

	const { isExpanded } = useDrawer(
		{
			contentRef,
			drawerRef,
			handleRef,
			spacerRef,
		},
		{
			initialIndex: 1,
			positions: [0, 260],
		},
	)
</script>

<style scoped>
	@media (--mobile) {
		.drawer {
			position: fixed;
			z-index: 10;
			inset-block-end: 0;
			transform: translateY(260px);

			inline-size: 100%;

			background-color: var(--color__surface);
			box-shadow:
				0 0 0 1px var(--color__muted),
				0 0 0.125rem rgb(0 0 0 / 10%),
				0 0 1rem rgb(0 0 0 / 10%);
		}

		.drawer,
		.handle {
			border-radius: calc(var(--radius) + 1.125em) calc(var(--radius) + 1.125em)
				0 0;

			@supports (corner-shape: squircle) {
				border-radius: calc(var(--radius) + 2.125em)
					calc(var(--radius) + 2.125em) 0 0;

				corner-shape: squircle;
			}
		}

		.handle {
			touch-action: none;
			user-select: none;

			position: sticky;
			z-index: 10;
			inset-block-start: 0;

			display: flex;
			align-items: center;
			justify-content: center;

			box-sizing: content-box;
			inline-size: stretch;
			block-size: var(--drawer__handle-height);
			padding-block-end: var(--gap);

			background-image: linear-gradient(
				to bottom,
				var(--color__surface) 70%,
				transparent
			);

			&::before {
				content: '';

				display: block;

				inline-size: calc(var(--gap) * 2);
				block-size: calc(var(--typography__outline-thickness) * 1.3);
				border-radius: var(--radius-sm);

				background-color: var(--color__outline);
			}
		}

		.content {
			touch-action: pan-y;

			overflow-block: auto;
			overscroll-behavior: contain;

			max-block-size: var(--drawer__max-position);
			margin-block-start: calc(-1 * var(--gap));
			padding-block: var(--gap) calc(var(--gap) * 3);
			padding-inline: var(--container-padding-inline);
		}

		.spacer {
			block-size: var(--drawer__translate);
		}
	}

	@media (--desktop) {
		.drawer {
			transform: none !important;
		}

		.spacer {
			display: none;
		}

		.handle {
			display: none;
		}
	}
</style>
