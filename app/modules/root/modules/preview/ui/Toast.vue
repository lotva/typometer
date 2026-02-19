<template>
	<Transition name="toast">
		<div
			v-if="isVisible"
			class="toast"
			role="status"
			aria-live="polite"
		>
			<span class="text-metrics-fix">{{ message }}</span>
		</div>
	</Transition>
</template>

<script setup lang="ts">
	defineProps<{
		isVisible: boolean
		message: string
	}>()
</script>

<style scoped>
	.toast {
		position: fixed;
		z-index: 11;
		inset-block-end: var(--gap);
		inset-inline-end: var(--container-padding-inline);
		transform-origin: bottom center;

		inline-size: fit-content;
		margin-block-start: -3rem;
		margin-inline-start: auto;
		padding: calc(var(--gap) * 0.75) var(--gap);
		border-radius: var(--radius);

		color: var(--color__background);

		background-color: var(--color__primary);

		@media (--desktop) {
			position: sticky;
			inset-block-end: 0;
		}
	}

	.toast-enter-active,
	.toast-leave-active {
		transition:
			opacity var(--animation__duration) var(--animation__ease-out),
			translate var(--animation__duration) var(--animation__ease-out);
	}

	.toast-enter-from,
	.toast-leave-to {
		translate: 0 0.2em;
		opacity: 0;
	}
</style>
