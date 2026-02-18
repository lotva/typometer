<template>
	<RadioGroupRoot v-model="outputFormat">
		<RadioGroupLabel data-route-transition>
			{{ $t('outputFormat.label') }}
		</RadioGroupLabel>

		<RadioGroupItem
			v-for="option in options"
			:key="option.value"
			:value="option.value"
		>
			<RadioGroupItemControl />

			<RadioGroupItemText data-route-transition>
				{{ $t(`outputFormat.${option.value}`) }}
			</RadioGroupItemText>

			<RadioGroupItemHiddenInput />
		</RadioGroupItem>
	</RadioGroupRoot>
</template>

<script setup lang="ts">
	import {
		RadioGroupItem,
		RadioGroupItemControl,
		RadioGroupItemHiddenInput,
		RadioGroupItemText,
		RadioGroupLabel,
		RadioGroupRoot,
	} from '@ark-ui/vue'

	import type { TOutputFormat } from '~/modules/root/model/types'

	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const store = useScaleStore()

	const options: { value: TOutputFormat }[] = [
		{ value: 'semantic' },
		{ value: 'tshirt' },
		{ value: 'numeric' },
	]

	const outputFormat = computed({
		get: () => store.outputFormat,
		set: (value: TOutputFormat) => {
			store.outputFormat = value
		},
	})
</script>

<style scoped>
	[data-scope='radio-group'][data-part='root'] {
		display: flex;
		flex-direction: column;
		gap: calc(var(--gap) / 2);

		[data-part='label'] {
			user-select: none;
		}

		[data-part='item'] {
			display: inline-flex;
			gap: calc(var(--gap) / 2);
			align-items: center;
		}

		[data-part='item-control'] {
			display: inline-flex;
			flex-shrink: 0;
			align-items: center;
			justify-content: center;

			inline-size: 1.25em;
			block-size: 1.25em;
			border: 1px solid var(--color__border);
			border-radius: 100vi;

			transition:
				border-color var(--animation__duration) var(--animation__ease),
				background-color var(--animation__duration) var(--animation__ease),
				text-decoration-color var(--animation__duration) var(--animation__ease),
				box-shadow var(--animation__duration--fast)
					var(--animation__ease-in-out),
				text-decoration-thickness var(--animation__duration--fast)
					var(--animation__ease-in-out),
				border-width var(--animation__duration--fast)
					var(--animation__ease-in-out);

			&[data-state='checked'] {
				border-color: var(--color__primary);
				border-width: 0.3em;
			}

			&[data-hover]:not([data-state='checked']) {
				background-color: var(--color__muted);
				transition-property: border-color, border-width, box-shadow;
			}

			&[data-focus-visible] {
				box-shadow: 0 0 0 var(--typography__outline-thickness)
					var(--color__outline);
			}
		}
	}
</style>
