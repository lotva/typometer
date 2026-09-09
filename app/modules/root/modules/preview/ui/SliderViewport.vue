<template>
	<SliderRoot
		v-model="value"
		:min="min"
		:max="max"
		:step="1"
		:get-aria-value-text="(value) => `${value} ${$t('controls.px')}`"
		class="slider"
	>
		<div class="header">
			<SliderLabel
				class="text-metrics-fix"
				data-route-transition
			>
				{{ $t('preview.currentViewportWidth') }}
			</SliderLabel>

			<span
				class="value text-metrics-fix"
				aria-hidden="true"
			>
				{{ currentViewportWidth }}
				<span data-route-transition>{{ $t('controls.px') }}</span>
			</span>
		</div>

		<SliderControl>
			<SliderTrack>
				<SliderRange />
			</SliderTrack>

			<SliderThumb :index="0">
				<SliderHiddenInput />
			</SliderThumb>
		</SliderControl>
	</SliderRoot>
</template>

<script setup lang="ts">
	import {
		SliderControl,
		SliderHiddenInput,
		SliderLabel,
		SliderRange,
		SliderRoot,
		SliderThumb,
		SliderTrack,
	} from '@ark-ui/vue'
	import { storeToRefs } from 'pinia'

	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()
	const { currentViewportWidth } = storeToRefs(store)

	const min = computed(() =>
		Math.min(store.settings.viewportMin, store.settings.viewportMax),
	)
	const max = computed(() =>
		Math.max(store.settings.viewportMin, store.settings.viewportMax),
	)

	const value = computed({
		get: () => [currentViewportWidth.value],
		set: (values) => {
			const value = values[0]
			if (value !== undefined) currentViewportWidth.value = value
		},
	})
</script>

<style scoped>
	.slider {
		display: grid;
		row-gap: calc(var(--gap) * 0.75);

		@media (--desktop) {
			row-gap: var(--gap);
		}
	}

	.header {
		display: flex;
		column-gap: var(--gap);
		align-items: baseline;
		justify-content: space-between;
	}

	.value {
		font-variant-numeric: tabular-nums;
		color: var(--color__foreground--muted);
	}

	[data-scope='slider'][data-part='control'] {
		position: relative;
		display: flex;
		align-items: center;

		@media (--mobile) {
			block-size: calc(var(--gap) * 2);
		}
	}

	[data-scope='slider'][data-part='track'] {
		position: relative;

		flex-grow: 1;

		block-size: calc(var(--gap) / 4);
		/* stylelint-disable-next-line value-keyword-case */
		border-radius: calc(Infinity * 1px);

		background-color: var(--color__muted);

		&::before {
			content: '';

			position: absolute;
			inset-block-start: 50%;
			inset-inline: 0;
			translate: 0 -50%;

			block-size: calc(var(--gap) * 3);
		}
	}

	[data-scope='slider'][data-part='range'] {
		block-size: 100%;
		border-radius: inherit;
		background-color: var(--color__primary);
	}

	[data-scope='slider'][data-part='thumb'] {
		position: absolute;

		display: flex;
		align-items: center;
		justify-content: center;

		inline-size: calc(var(--gap) * 0.75);
		block-size: calc(var(--gap) * 0.75);
		border-radius: 50%;

		background-color: var(--color__primary);

		&::before {
			content: '';

			position: absolute;
			inset-block-start: 50%;
			inset-inline-start: 50%;
			translate: -50% -50%;

			/* ~48×48 touch target */
			inline-size: calc(var(--gap) * 3);
			block-size: calc(var(--gap) * 3);
		}

		&:focus-visible {
			border-color: var(--color__primary);
			outline: var(--typography__outline-thickness) solid var(--color__outline);
			outline-offset: var(--typography__outline-thickness);
		}
	}
</style>
