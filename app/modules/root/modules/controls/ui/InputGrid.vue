<template>
	<div class="controls-root">
		<Switch.Root
			:checked="store.settings.shouldSnapToGrid"
			@checked-change="
				(details) => store.updateSettings({ shouldSnapToGrid: details.checked })
			"
		>
			<Switch.Control>
				<Switch.Thumb />
			</Switch.Control>

			<Switch.Label
				class="text-metrics-fix"
				data-route-transition
			>
				{{ $t('controls.grid') }}
			</Switch.Label>

			<Switch.HiddenInput :aria-controls="inputId" />
		</Switch.Root>

		<div
			:id="inputId"
			class="module"
			:aria-hidden="!store.settings.shouldSnapToGrid"
		>
			<NumberInput
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
	import { type NumberInputValueChangeDetails, Switch } from '@ark-ui/vue'

	import NumberInput from '~/common/ui/NumberInput.vue'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const inputId = useId()
	const descriptionId = useId()

	const step = computed(() => (store.settings.unit === 'px' ? 1 : 0.1))
	const min = computed(() => (store.settings.unit === 'px' ? 1 : 0.1))
	const max = computed(() => (store.settings.unit === 'px' ? 16 : 1))

	const updateGridStep = (details: NumberInputValueChangeDetails) => {
		store.updateGridStep(details.valueAsNumber, store.settings.unit)
	}
</script>

<style scoped>
	[data-scope='switch'] {
		&[data-part='root'] {
			position: relative;
			display: inline-flex;
			gap: calc(var(--gap) / 2);
			align-items: center;
		}

		[data-part='control'] {
			--control-inline-size: 2em;

			display: inline-flex;
			flex-shrink: 0;
			align-items: center;

			inline-size: var(--control-inline-size);
			block-size: 1.5cap;
			padding: 0.125rem;
			border-radius: 100vi;

			background-color: var(--color__muted);

			transition:
				background-color var(--animation__duration--fast) var(--animation__ease),
				box-shadow var(--animation__duration--fast) var(--animation__ease);

			&[data-state='checked'] {
				background-color: var(--color__primary);
			}

			&[data-hover] {
				&[data-state='checked'] {
					background-color: var(--color__primary--hover);
				}

				&[data-state='unchecked'] {
					background-color: var(--color__muted--hover);
				}
			}

			&[data-focus-visible] {
				box-shadow: 0 0 0 var(--typography__outline-thickness)
					var(--color__outline);
			}
		}

		[data-part='thumb'] {
			--size: 1.2cap;

			display: flex;
			align-items: center;
			justify-content: center;

			inline-size: var(--size);
			block-size: var(--size);
			border-radius: 100vi;

			background-color: var(--color__background);

			transition: translate var(--animation__duration--fast)
				var(--animation__ease);

			@media (prefers-color-scheme: dark) {
				background-color: var(--color__foreground);
			}

			&[data-state='checked'] {
				translate: calc(
						var(--control-inline-size) - var(--size) - 0.125rem - 0.125rem
					)
					0;
				background-color: var(--color__background);
			}
		}

		[data-part='label'] {
			user-select: none;
		}
	}

	.module {
		display: flex;
		column-gap: calc(var(--gap) / 2);
		align-items: baseline;

		&[aria-hidden='true'] {
			opacity: var(--color__disabled-state-opacity);
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
