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
		</NumberInputLabel>

		<NumberInputControl>
			<NumberInputInput as-child>
				<Input />
			</NumberInputInput>

			<div class="triggers">
				<NumberInputIncrementTrigger />

				<NumberInputDecrementTrigger />
			</div>
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

	interface IProps extends NumberInputRootProps {
		label?: string
		size?: TSize
	}

	type TSize = 'l' | 'm' | 's'

	const { label = '', size = 'l', ...rootProps } = defineProps<IProps>()
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

			[data-part='root']._l & {
				font-size: 1.25em;
			}
		}

		&[data-part='input'] {
			inline-size: 100%;
			padding-inline-end: calc(var(--gap) * 2);
		}

		.triggers {
			position: absolute;
			inset-block-start: 50%;
			inset-inline-end: var(--gap);
			translate: 0 -50%;

			display: grid;
			row-gap: 0.1rem;
		}

		&[data-part='increment-trigger'],
		&[data-part='decrement-trigger'] {
			position: relative;

			padding: 0.15em;
			border-radius: 0 0 var(--radius-sm) var(--radius-sm);

			background-color: var(--color__muted);

			transition:
				background-color var(--animation__duration--fast) var(--animation__ease),
				opacity var(--animation__duration--fast) var(--animation__ease);

			&:hover {
				background-color: var(--color__muted--hover);
				transition: none;

				&[disabled] {
					opacity: var(--color__disabled-state-opacity);
					background-color: var(--color__muted);
				}
			}

			&::before {
				content: '';

				position: absolute;
				z-index: 1;
				inset-block: 0 -0.3em;
				inset-inline: -0.3em calc(-1 * var(--gap));
			}

			&::after {
				content: '';

				display: block;

				inline-size: 0.25em;
				block-size: 0.25em;

				background: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%206%206'%3e%3cpath%20fill='%23000'%20d='M.707%201.825%202.62%204.057a.5.5%200%200%200%20.76%200l1.913-2.232A.5.5%200%200%200%204.913%201H1.087a.5.5%200%200%200-.38.825Z'/%3e%3c/svg%3e");

				@media (prefers-color-scheme: dark) {
					filter: invert(0.9);
				}
			}

			&[data-part='increment-trigger'] {
				border-radius: var(--radius-sm) var(--radius-sm) 0 0;

				&::before {
					inset-block: -0.3em 0;
				}

				&::after {
					rotate: 180deg;
				}
			}
		}
	}
</style>
