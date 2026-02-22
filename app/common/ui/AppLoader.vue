<template>
	<p
		class="loader"
		role="status"
		aria-live="polite"
	>
		{{ $t('loading') }}
	</p>
</template>

<style scoped>
	.loader {
		pointer-events: none;

		position: fixed;

		/* stylelint-disable-next-line value-keyword-case */
		z-index: calc(Infinity);
		inset: 0;

		display: none;
		place-items: center;

		opacity: 0;
		background-color: var(--color__background);

		@media (prefers-reduced-motion: no-preference) {
			transition:
				opacity var(--animation__duration--transition)
					var(--animation__timing--transition),
				display var(--animation__duration--transition) allow-discrete;
		}

		html._loading & {
			pointer-events: all;
			display: grid;
			opacity: 1;
		}
	}
</style>
