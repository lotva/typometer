<template>
	<div
		id="drawer"
		class="drawer"
	>
		<button
			class="expand"
			type="button"
			:aria-label="isExpanded ? $t('panel.collapse') : $t('panel.expand')"
			:aria-expanded="isExpanded"
			aria-controls="drawer"
		></button>

		<slot></slot>
	</div>
</template>

<script setup lang="ts">
	const isExpanded = ref(false)
</script>

<style scoped>
	.drawer {
		@media (--mobile) {
			--end-position: calc(297px + env(safe-area-inset-bottom, 0));

			position: sticky;
			z-index: 10;
			inset-block-end: 0;
			transform: translateY(min(var(--touch-diff, 0), var(--end-position)));

			overflow-block: auto;

			inline-size: 100%;
			max-block-size: calc(var(--gap) * 17);
			padding: 0 var(--container-padding-inline)
				calc(env(safe-area-inset-bottom, 0) + var(--gap) * 3);
			border-radius: calc(var(--radius) + 1.125em) calc(var(--radius) + 1.125em)
				0 0;

			background-color: var(--color__surface);
			backdrop-filter: blur(24px);
			box-shadow:
				0 0 0 1px var(--color__muted),
				0 0 0.125rem rgb(0 0 0 / 10%),
				0 0 1rem rgb(0 0 0 / 10%);

			transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);

			@supports (corner-shape: squircle) {
				border-radius: calc(var(--radius) + 2.125em)
					calc(var(--radius) + 2.125em) 0 0;

				corner-shape: squircle;
			}
		}
	}

	.expand {
		user-select: none;

		position: sticky;
		z-index: 10;
		inset-block-start: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		inline-size: stretch;
		block-size: calc(var(--gap) * 2);
		margin-block-end: var(--gap);
		margin-inline: calc(-1 * var(--container-padding-inline));

		background-image: linear-gradient(
			to bottom,
			var(--color__surface) 70%,
			transparent
		);

		@media (--desktop) {
			display: none;
		}

		&::before {
			content: '';

			display: block;

			inline-size: calc(var(--gap) * 2);
			block-size: calc(var(--typography__outline-thickness) * 1.3);
			border-radius: var(--radius-sm);

			background-color: var(--color__outline);
		}
	}
</style>
