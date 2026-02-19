<template>
	<NumberInputRoot
		v-bind="mergedProps"
		:class="[{ '_has-label': label }, `_${size}`]"
	>
		<NumberInputLabel
			v-if="label"
			class="text-metrics-fix has-compensator"
			data-route-transition
		>
			{{ label }}

			<kbd
				class="hotkey"
				aria-hidden="true"
			>
				{{ hotkey }}
			</kbd>
		</NumberInputLabel>

		<NumberInputControl>
			<NumberInputDecrementTrigger>−</NumberInputDecrementTrigger>

			<NumberInputInput as-child>
				<Input
					ref="inputRef"
					:aria-keyshortcuts="hotkey"
				/>
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
		type NumberInputRootEmits,
		type NumberInputRootProps,
		useForwardPropsEmits,
	} from '@ark-ui/vue'

	import Input from '~/common/ui/Input.vue'

	import { useFocusHotkey } from '../lib/useFocusHotkey'

	interface IProps extends NumberInputRootProps {
		hotkey?: string
		label?: string
		size?: TSize
	}

	type TSize = 'l' | 'm' | 's'

	const {
		hotkey = '',
		label = '',
		size = 'l',
		...rootProps
	} = defineProps<IProps>()
	const emits = defineEmits<NumberInputRootEmits>()

	const { locale: selectedLocale } = useI18n()

	const forwarded = useForwardPropsEmits(rootProps, emits)

	const mergedProps = computed<NumberInputRootProps>(() => ({
		...forwarded.value,

		allowMouseWheel: forwarded.value.allowMouseWheel ?? true,
		focusInputOnChange: forwarded.value.focusInputOnChange ?? false,
		formatOptions: {
			localeMatcher: 'best fit',
			...forwarded.value.formatOptions,
		},
		locale: selectedLocale.value === 'ru' ? 'ru-RU' : 'en-US',
	}))

	const inputRef = ref<{ $el: HTMLInputElement }>()

	if (hotkey) {
		useFocusHotkey(inputRef, hotkey)
	}
</script>

<style scoped>
	[data-scope='number-input'] {
		&[data-part='root'] {
			&[data-disabled] {
				pointer-events: none;
			}

			&._has-label {
				display: grid;
				row-gap: var(--gap);
			}
		}

		&[data-part='control'] {
			display: grid;
			grid-template-columns: 1fr 2fr 1fr;
			column-gap: calc(var(--gap) / 4);

			[data-part='root']._l & {
				font-size: 1.25em;
			}
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

	.hotkey {
		position: relative;

		display: none;

		margin-inline-start: calc(var(--typography__space-width) * 2.75);

		font-family: inherit;
		font-size: 0.65em;
		font-weight: bold;
		color: var(--color__foreground--muted);
		text-align: center;

		&::before {
			content: '';

			position: absolute;
			inset-block-start: 50%;
			inset-inline-start: 50%;
			translate: -50% -50%;

			inline-size: 3.2ex;
			block-size: 3.2ex;
			border: 1px solid var(--color__outline);
			border-block-end-width: 2px;
			border-radius: var(--radius);
		}
	}
</style>
