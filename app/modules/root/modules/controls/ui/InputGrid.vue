<template>
	<div class="root">
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
			<NumberInput
				:model-value="String(store.settings.gridStep)"
				class="input"
				:min="GRID_STEP_BOUNDS.min"
				:max="GRID_STEP_BOUNDS.max"
				:step="1"
				:disabled="!store.settings.shouldSnapToGrid"
				:aria-label="$t('controls.gridStep', { unit: $t('controls.px') })"
				:aria-describedby="descriptionId"
				@value-change="updateGridStep"
			/>

			<span
				class="unit"
				data-route-transition
			>
				{{ $t('controls.px') }}
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
	import NumberInput from '~/common/ui/NumberInput.vue'
	import { GRID_STEP_BOUNDS } from '~/modules/root/config/setting-bounds'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const inputId = useId()
	const descriptionId = useId()

	const updateGridStep = withValidation(
		(details: NumberInputValueChangeDetails) => {
			store.updateGridStep(details.valueAsNumber)
		},
		{
			max: () => GRID_STEP_BOUNDS.max,
			min: () => GRID_STEP_BOUNDS.min,
		},
	)
</script>

<style scoped>
	.root {
		display: grid;
		row-gap: var(--gap);
	}

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

		font-size: var(--fs-l);

		transition: none;

		&[aria-hidden='true'] {
			opacity: var(--color__disabled-state-opacity);
			transition: opacity var(--animation__duration--fast)
				var(--animation__ease);
		}
	}

	.input {
		inline-size: calc(50% - var(--gap) / 4);
	}

	.unit {
		flex-shrink: 0;
	}
</style>
