<template>
	<li
		class="row"
		:style="{ fontSize }"
		@click="emit('copy', item.value)"
	>
		<div class="sample">
			<p class="text">
				{{ item.category }}

				{{ currentPx }}

				<span
					v-if="item.value === store.settings.baseMax"
					class="hint"
					data-route-transition
				>
					{{ $t('controls.base.label') }}
				</span>
			</p>
		</div>

		<div
			class="probe-chain text-metrics-fix"
			role="group"
			:aria-label="probeAriaLabel"
		>
			<span class="probe _mobile">
				{{ mobilePx }}
			</span>

			→

			<span class="probe _current">
				{{ currentPx }}
			</span>

			→

			<span class="probe _desktop">
				{{ desktopPx }}
			</span>
		</div>
	</li>
</template>

<script setup lang="ts">
	import type { TScalePreviewItem } from '../lib/useScalePreview'

	import { computeFluidTokenPx } from '../../../lib/scale'
	import { useScaleStore } from '../../../model/useScaleStore'
	import { getFluidPreviewFontSize } from '../../tokens/lib/fluid-token'

	const { item, viewportWidth } = defineProps<{
		item: TScalePreviewItem
		viewportWidth: number
	}>()

	const emit = defineEmits<{
		copy: [value: number]
	}>()

	const store = useScaleStore()

	const fontSize = computed(() =>
		getFluidPreviewFontSize(item.offset, store.settings),
	)

	const mobilePx = computed(() => getSizeAtViewport(store.settings.viewportMin))

	const desktopPx = computed(() =>
		getSizeAtViewport(store.settings.viewportMax),
	)

	const currentPx = computed(() => getSizeAtViewport(viewportWidth))

	const probeAriaLabel = computed(() =>
		$t('preview.probeSizesAria', {
			current: formatPxForAria(currentPx.value),
			desktop: formatPxForAria(desktopPx.value),
			mobile: formatPxForAria(mobilePx.value),
		}),
	)

	function formatPxForAria(value: number) {
		return `${value} ${$t('controls.px')}`
	}

	function getSizeAtViewport(width: number) {
		return computeFluidTokenPx(item.offset, width, store.settings)
	}
</script>

<style scoped>
	.row {
		cursor: copy;

		contain: layout paint;
		align-items: first baseline;

		margin-inline: calc(-1 * var(--container-padding-inline));
		padding-block-end: calc(1.3rem + 0.3em);
		padding-inline: var(--container-padding-inline);
		border-block-start: 1px solid var(--color__border);

		transition: background-color var(--animation__duration)
			var(--animation__ease);

		@container scale-preview (width >= 28rem) {
			display: flex;
			column-gap: calc(var(--gap) * 2);
			justify-content: space-between;
			padding-block-end: calc(0.3rem + 0.2em);
		}

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background-color: var(--color__surface);
				transition: none;
			}
		}

		&:first-child {
			border-block-start: 0;
		}
	}

	.sample {
		position: relative;

		flex-grow: 1;

		inline-size: 100%;
		min-inline-size: 0;
		padding-block: calc(0.4rem + 0.2em) calc(1rem + 0.1em);

		letter-spacing: calc(0.07rem - 0.07em);

		clip-path: inset(0 0 0 calc(var(--typography__compensator) - 0.05em));

		@media (hover: hover) and (pointer: fine) {
			.row:hover &::after {
				background-color: var(--color__surface);
				transition: none;
			}
		}

		&::after {
			pointer-events: none;
			content: '';

			position: absolute;
			inset-block: 0;
			inset-inline-end: 0;

			inline-size: 0.75em;

			background-color: var(--color__background);

			transition: background-color var(--animation__duration)
				var(--animation__ease);

			mask-image: linear-gradient(to right, transparent, #000);
		}
	}

	.text {
		white-space: nowrap;
	}

	.probe-chain {
		font-size: var(--fs-s);
		font-variant-numeric: tabular-nums;
		color: var(--color__foreground--muted);

		@container scale-preview (width >= 28rem) {
			flex-shrink: 0;
		}
	}

	.probe {
		&._mobile {
			text-align: end;
		}

		&._current {
			color: var(--color__foreground);
			text-align: center;
		}

		&._desktop {
			display: inline-block;
			min-inline-size: 3ch;
			text-align: start;
		}
	}

	.hint {
		font-style: normal;
		color: var(--color__foreground--muted);
	}
</style>
