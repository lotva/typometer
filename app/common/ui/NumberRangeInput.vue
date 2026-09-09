<template>
	<fieldset>
		<legend
			class="text-metrics-fix has-compensator"
			data-route-transition
		>
			{{ displayLabel }}
			<span
				v-if="hotkey"
				class="visually-hidden"
			>
				{{ $t('controls.hotkeyHint', { key: hotkey }) }}
			</span>
		</legend>

		<div class="fields">
			<div class="field">
				<label
					:for="minInputId"
					class="visually-hidden"
				>
					{{ minLabel }}
				</label>

				<NumberInput
					:ids="{ input: minInputId }"
					:model-value="minValue"
					:min
					:max
					:step
					:hotkey
					:decrement-label="$t('controls.decreaseNamed', { name: minLabel })"
					:increment-label="$t('controls.increaseNamed', { name: minLabel })"
					@value-change="updateMin"
				/>
			</div>

			<div class="field">
				<label
					:for="maxInputId"
					class="visually-hidden"
				>
					{{ maxLabel }}
				</label>

				<NumberInput
					:ids="{ input: maxInputId }"
					:model-value="maxValue"
					:min
					:max
					:step
					:decrement-label="$t('controls.decreaseNamed', { name: maxLabel })"
					:increment-label="$t('controls.increaseNamed', { name: maxLabel })"
					@value-change="updateMax"
				/>
			</div>
		</div>
	</fieldset>
</template>

<script setup lang="ts">
	import { useLocalizedNumber } from '~/common/lib/useLocalizedNumber'
	import { useRange } from '~/common/lib/useRange'
	import NumberInput from '~/common/ui/NumberInput.vue'

	interface IProps {
		hotkey?: string
		label: string
		max: number
		maxLabel: string
		min: number
		minLabel: string
		step: number
		unit?: string
	}

	const {
		hotkey = '',
		label,
		max,
		maxLabel,
		min,
		minLabel,
		step,
		unit = '',
	} = defineProps<IProps>()

	const range = defineModel<[number, number]>({ required: true })

	const minInputId = useId()
	const maxInputId = useId()

	const displayLabel = computed(() => (unit ? `${label}, ${unit}` : label))

	const minValue = useLocalizedNumber(() => range.value[0])
	const maxValue = useLocalizedNumber(() => range.value[1])

	const { updateMax, updateMin } = useRange({
		get: () => range.value,
		max,
		min,
		set: (value) => {
			range.value = value
		},
	})
</script>

<style scoped>
	.fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: calc(var(--gap) / 2);
		margin-block-start: var(--gap);
	}
</style>
