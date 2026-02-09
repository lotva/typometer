<template>
	<NumberInput.Root
		v-model="steps"
		:focus-input-on-change="false"
		allow-mouse-wheel
		:min="0"
		:max="6"
		class="controls-root"
	>
		<NumberInput.Label
			class="text-metrics-fix has-compensator"
			data-route-transition
		>
			{{ $t('controls.steps') }}
		</NumberInput.Label>

		<NumberInput.Control class="controls-content">
			<NumberInput.DecrementTrigger>−</NumberInput.DecrementTrigger>

			<NumberInput.Input as-child>
				<Input />
			</NumberInput.Input>

			<NumberInput.IncrementTrigger>+</NumberInput.IncrementTrigger>
		</NumberInput.Control>
	</NumberInput.Root>
</template>

<script setup lang="ts">
	import { NumberInput } from '@ark-ui/vue'

	import Input from '~/common/ui/Input.vue'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const steps = computed({
		get: () => String(store.settings.intermediateSteps),
		set: (value: string) => {
			store.updateSettings({ intermediateSteps: Number(value) })
		},
	})
</script>

<style scoped>
	[data-scope='number-input'] {
		&[data-part='control'] {
			display: grid;
			grid-template-columns: 1fr 2fr 1fr;
			column-gap: calc(var(--gap) / 4);
		}

		&[data-part='input'] {
			inline-size: 100%;
			text-align: center;
		}

		&[data-part='increment-trigger'],
		&[data-part='decrement-trigger'] {
			border-radius: var(--radius);
			background-color: var(--color__muted);

			&:not([disabled]):hover {
				background-color: var(--color__muted--hover);
				transition: none;
			}

			&[disabled] {
				opacity: var(--color__disabled-state-opacity);
			}
		}
	}
</style>
