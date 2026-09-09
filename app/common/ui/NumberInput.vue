<template>
	<NumberInputRoot
		v-bind="mergedProps"
		:class="rootClass"
		:style="rootStyle"
	>
		<NumberInputLabel
			v-if="label"
			class="text-metrics-fix has-compensator"
			data-route-transition
		>
			{{ label }}
			<span
				v-if="hotkey"
				class="visually-hidden"
			>
				{{ $t('controls.hotkeyHint', { key: hotkey }) }}
			</span>
		</NumberInputLabel>

		<NumberInputControl :class="{ '_hotkey-pressed': isHotkeyPressed }">
			<NumberInputInput as-child>
				<Input
					ref="inputRef"
					v-bind="inputAttributes"
				/>
			</NumberInputInput>

			<div class="triggers">
				<NumberInputDecrementTrigger>−</NumberInputDecrementTrigger>

				<NumberInputIncrementTrigger>+</NumberInputIncrementTrigger>
			</div>
		</NumberInputControl>
	</NumberInputRoot>
</template>

<script setup lang="ts">
	import type { StyleValue } from 'vue'

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

	import { useFocusHotkey } from '~/common/lib/useFocusHotkey'
	import Input from '~/common/ui/Input.vue'

	import { toIntlLocale } from '../lib/toIntlLocale'
	import { NUMBER_FORMAT_OPTIONS } from '../lib/useLocalizedNumber'

	interface IProps extends NumberInputRootProps {
		decrementLabel?: string
		hotkey?: string
		incrementLabel?: string
		label?: string
	}

	const {
		decrementLabel = '',
		hotkey = '',
		incrementLabel = '',
		label = '',
		...rootProps
	} = defineProps<IProps>()
	const emits = defineEmits<NumberInputRootEmits>()

	defineOptions({ inheritAttrs: false })

	const attributes = useAttrs()
	const { locale } = useI18n()

	const forwarded = useForwardPropsEmits(rootProps, emits)

	const mergedProps = computed<NumberInputRootProps>(() => {
		const { formatOptions, ...rest } = toValue(forwarded)

		return {
			...rest,

			allowMouseWheel: rest.allowMouseWheel ?? true,
			focusInputOnChange: rest.focusInputOnChange ?? false,
			formatOptions: {
				localeMatcher: 'best fit',
				...NUMBER_FORMAT_OPTIONS,
				...formatOptions,
				useGrouping: false,
			},
			locale: toIntlLocale(locale.value),
			translations: {
				...rest.translations,
				decrementLabel: decrementLabel || $t('controls.decreaseValue'),
				incrementLabel: incrementLabel || $t('controls.increaseValue'),
			},
		}
	})

	const rootClass = computed(() => [
		attributes.class,
		{ '_has-label': Boolean(label) },
	])

	const rootStyle = computed(() => attributes.style as StyleValue | undefined)

	const inputAttributes = computed(() => {
		const rest = { ...attributes }
		delete rest.class
		delete rest.style

		return {
			...rest,
			...(hotkey ? { 'aria-keyshortcuts': hotkey } : {}),
		}
	})

	const inputRef = ref<{ $el: HTMLInputElement }>()
	const isHotkeyPressed = useFocusHotkey(inputRef, hotkey)

	defineExpose({ inputRef })
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
			position: relative;
			font-size: var(--fs-l);
			transition: scale var(--animation__duration--fast) var(--animation__ease);

			&._hotkey-pressed {
				scale: 0.98;
				transition: none;
			}
		}

		&[data-part='input'] {
			inline-size: 100%;
			padding-inline-end: calc(var(--gap) * 3);
			text-align: start;
		}

		.triggers {
			position: absolute;
			inset-block: 0;
			inset-inline-end: 0;

			overflow: hidden;
			display: flex;
			align-items: stretch;

			border-start-end-radius: var(--radius);
			border-end-end-radius: var(--radius);
		}

		&[data-part='increment-trigger'] {
			position: relative;

			&::before {
				content: '';

				position: absolute;
				inset-block: 1px;
				inset-inline-start: 0;

				inline-size: 1px;

				background: var(--color__border);
			}
		}

		&[data-part='increment-trigger'],
		&[data-part='decrement-trigger'] {
			display: flex;
			align-items: center;
			justify-content: center;

			padding-inline: calc(var(--gap) / 2);

			color: var(--color__foreground--muted);

			background: none;

			&:not([disabled]):hover {
				color: var(--color__primary);
				transition: none;
			}

			&[disabled] {
				opacity: var(--color__disabled-state-opacity);
			}
		}
	}
</style>
