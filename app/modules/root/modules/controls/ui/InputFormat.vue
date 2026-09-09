<template>
	<fieldset class="group">
		<legend
			class="label text-metrics-fix"
			data-route-transition
		>
			{{ $t('outputFormat.label') }}
		</legend>

		<label
			v-for="option in options"
			:key="option.value"
			class="item"
		>
			<input
				v-model="outputFormat"
				type="radio"
				:name="'output-format'"
				:value="option.value"
				class="input"
			/>

			<span
				class="caption"
				data-route-transition
			>
				{{ $t(`outputFormat.${option.value}`) }}
			</span>
		</label>
	</fieldset>
</template>

<script setup lang="ts">
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
	.group {
		display: flex;
		flex-direction: column;
	}

	.label {
		user-select: none;
	}

	.item {
		display: inline-flex;
		gap: calc(var(--gap) / 2);
		align-items: center;
		margin-block-start: calc(var(--gap) / 2);

		&:first-of-type {
			margin-block-start: var(--gap);
		}
	}

	.input {
		--color: var(--color__border);
		--color-checked: var(--color__primary);
		--color-hover: var(--color__muted);
		--color-focus: var(--color__outline);

		display: inline-grid;
		place-content: center;

		inline-size: var(--fs-l);
		block-size: var(--fs-l);
		margin: 0;
		border: 1px solid var(--color);
		border-radius: 50%;

		appearance: none;

		transition:
			border-width var(--animation__duration--fast)
				var(--animation__ease-in-out),
			background-color var(--animation__duration) var(--animation__ease);

		@media (forced-colors: active) {
			--color: ButtonText;
			--color-checked: Highlight;
		}

		&::before {
			inline-size: 0.6em;
			block-size: 0.6em;
			border-radius: 50%;

			background-color: transparent;

			transition: background-color var(--animation__duration)
				var(--animation__ease);
		}

		&:focus-visible {
			box-shadow: 0 0 0 var(--typography__outline-thickness) var(--color-focus);
		}

		&:checked {
			border-color: var(--color-checked);
			border-width: 0.25em;

			&::before {
				background-color: var(--color-checked);
			}
		}

		&:hover:not(:checked) {
			background-color: var(--color-hover);
			transition: none;
		}
	}

	.caption {
		user-select: none;
	}
</style>
