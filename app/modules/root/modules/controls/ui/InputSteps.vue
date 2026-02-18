<template>
	<NumberInputRoot
		v-model="steps"
		:focus-input-on-change="false"
		allow-mouse-wheel
		:min="0"
		:max="5"
		class="controls-root"
	>
		<NumberInputLabel
			class="text-metrics-fix has-compensator"
			data-route-transition
		>
			{{ $t('controls.steps') }}
		</NumberInputLabel>

		<NumberInputControl class="controls-content">
			<NumberInputDecrementTrigger>−</NumberInputDecrementTrigger>

			<NumberInputInput as-child>
				<Input />
			</NumberInputInput>

			<NumberInputIncrementTrigger>+</NumberInputIncrementTrigger>
		</NumberInputControl>
	</NumberInputRoot>
</template>

<script setup lang="ts">
	import {
		NumberInputControl,
		NumberInputDecrementTrigger,
		NumberInputIncrementTrigger,
		NumberInputInput,
		NumberInputLabel,
		NumberInputRoot,
	} from '@ark-ui/vue'

	import Input from '~/common/ui/Input.vue'
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const steps = computed({
		get: () => String(store.settings.intermediateSteps),
		set: (value: string) => {
			store.updateIntermediateSteps(Number(value))
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
