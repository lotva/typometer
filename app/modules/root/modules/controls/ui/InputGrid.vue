<template>
	<div class="controls-root">
		<label
			class="label"
			data-route-transition
		>
			<input
				class="switch"
				type="checkbox"
				role="switch"
				:aria-controls="inputId"
				:checked="store.settings.shouldSnapToGrid"
				@change="
					(e) =>
						store.updateSettings({
							shouldSnapToGrid: (e.target as HTMLInputElement).checked,
						})
				"
			/>

			<span class="text text-metrics-fix">
				{{ $t('controls.grid') }}
			</span>
		</label>

		<div
			:id="inputId"
			class="module"
			:aria-hidden="!store.settings.shouldSnapToGrid"
		>
			<NumberInputInline
				:model-value="String(store.settings.gridStep)"
				class="input"
				:min="min"
				:max="max"
				:step="step"
				:disabled="!store.settings.shouldSnapToGrid"
				:aria-describedby="descriptionId"
				@value-change="updateGridStep"
			/>

			<span
				class="unit"
				data-route-transition
			>
				{{ $t(`controls.${store.settings.unit}`) }}
			</span>

			<span
				:id="descriptionId"
				class="visually-hidden"
			>
				{{ $t('controls.gridDescription') }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { NumberInputValueChangeDetails } from '@ark-ui/vue'

	import { withValidation } from '~/common/lib/withValidation'
	import NumberInputInline from '~/common/ui/NumberInputInline.vue'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const inputId = useId()
	const descriptionId = useId()

	const step = computed(() => (store.settings.unit === 'px' ? 1 : 0.1))
	const min = computed(() => (store.settings.unit === 'px' ? 2 : 0.1))
	const max = computed(() => (store.settings.unit === 'px' ? 16 : 1))

	const updateGridStep = withValidation(
		(details: NumberInputValueChangeDetails) => {
			store.updateGridStep(details.valueAsNumber, store.settings.unit)
		},
		{
			max: () => max.value,
			min: () => min.value,
		},
	)
</script>

<style scoped>
	.label {
		display: inline-flex;
		gap: calc(var(--gap) / 2);
		align-items: center;
	}

	.text {
		user-select: none;
	}

	.switch {
		--control-inline-size: 2em;
		--thumb-size: 1.2cap;
		--thumb-padding: var(--typography__outline-thickness);

		position: relative;

		flex-shrink: 0;

		inline-size: var(--control-inline-size);
		block-size: 1.5cap;
		margin: 0;
		padding: var(--thumb-padding);
		border-radius: 100vi;

		appearance: none;
		background-color: var(--color__muted);

		transition:
			background-color var(--animation__duration--fast) var(--animation__ease),
			box-shadow var(--animation__duration--fast) var(--animation__ease);

		&::before {
			content: '';

			position: absolute;
			inset-block-start: 50%;
			inset-inline-start: var(--thumb-padding);
			transform: translateY(-50%);

			inline-size: var(--thumb-size);
			block-size: var(--thumb-size);
			border-radius: 100vi;

			background-color: var(--color__background);

			transition: translate var(--animation__duration--fast)
				var(--animation__ease);

			@media (prefers-color-scheme: dark) {
				background-color: var(--color__foreground);
			}
		}

		&:hover {
			background-color: var(--color__muted--hover);
		}

		&:checked {
			background-color: var(--color__primary);

			&::before {
				translate: calc(
						var(--control-inline-size) - var(--thumb-size) -
							var(--thumb-padding) * 2
					)
					0;
				background-color: var(--color__background);
			}

			&:hover {
				background-color: var(--color__primary--hover);
			}
		}
	}

	.module {
		display: flex;
		flex-basis: 100%;
		column-gap: calc(var(--gap) / 2);
		align-items: baseline;

		transition: none;

		&[aria-hidden='true'] {
			opacity: var(--color__disabled-state-opacity);
			transition: opacity var(--animation__duration--fast)
				var(--animation__ease);
		}
	}

	.input {
		max-inline-size: 13ch;
	}

	.unit {
		flex-shrink: 0;
		font-size: 1.25em;
	}
</style>
