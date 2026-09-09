<template>
	<div class="root">
		<div
			class="visually-hidden"
			role="status"
		>
			{{ isVisible ? message : '' }}
		</div>

		<div class="anchor">
			<Transition name="toast">
				<div
					v-if="isVisible"
					class="toast"
					aria-hidden="true"
				>
					<span class="text-metrics-fix has-compensator">
						{{ message }}
					</span>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		isVisible: boolean
		message: string
	}>()
</script>

<style scoped>
	.root {
		display: contents;
	}

	.anchor {
		pointer-events: none;

		@media (--desktop) {
			position: sticky;
			z-index: 11;
			inset-block-end: 0;

			overflow: visible;
			display: flex;
			justify-content: flex-end;

			block-size: 0;
		}
	}

	.toast {
		pointer-events: auto;

		position: fixed;
		z-index: 11;
		inset-block-end: var(--gap);
		inset-inline-end: var(--container-padding-inline);
		transform-origin: bottom center;

		display: flex;

		inline-size: fit-content;
		block-size: fit-content;
		padding: calc(
				var(--gap) * 0.75 + var(--typography__surface-capital-compensator)
			)
			var(--gap) calc(var(--gap) * 0.75);
		border-radius: var(--radius);

		color: var(--color__background);

		background-color: var(--color__primary);

		@media (--desktop) {
			position: static;
			inset: auto;
			translate: 0 -100%;
		}

		&.toast-enter-active,
		&.toast-leave-active {
			transition:
				opacity var(--animation__duration) var(--animation__ease-out),
				translate var(--animation__duration) var(--animation__ease-out);
		}

		&.toast-enter-from,
		&.toast-leave-to {
			translate: 0 0.2em;
			opacity: 0;

			@media (--desktop) {
				translate: 0 calc(-100% + 0.2em);
			}
		}
	}
</style>
