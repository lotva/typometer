<template>
	<div class="scale">
		<template
			v-for="(item, index) in categorizedScale"
			:key="index"
		>
			<div
				class="item"
				:class="{
					_disabled: isValueDisabled(item.value),
				}"
				:style="{
					fontSize: `${item.value}${store.settings.unit}`,
				}"
				@click="copyTokenName(item.value)"
			>
				<p class="title">
					{{ item.value.toLocaleString(locale === 'ru' ? 'ru-RU' : 'en-US') }}
					{{ capitalize(item.category) }}

					<em
						v-if="item.value === store.settings.base"
						class="hint"
					>
						{{ $t('controls.base') }}
					</em>
				</p>

				<button
					v-if="isCustomStep(item.value)"
					type="button"
					class="button"
					@click.stop="removeCustomStepByValue(item.value)"
				>
					<span class="text-metrics-fix">Remove</span>
				</button>
			</div>
		</template>

		<Toast
			:message="message"
			:is-visible="isVisible"
		/>
	</div>
</template>

<script setup lang="ts">
	import { useScaleStore } from '~/modules/root/model/useScaleStore'
	import { useScalePreview } from '~/modules/root/modules/preview/lib/useScalePreview'
	import { useToast } from '~/modules/root/modules/preview/lib/useToast'
	import Toast from '~/modules/root/modules/preview/ui/Toast.vue'

	const props = defineProps<{
		scrollContainerRef: null | { $el: HTMLElement }
	}>()

	const emit = defineEmits<{
		scrollToBottom: []
	}>()

	const store = useScaleStore()

	const { isVisible, message, showToast } = useToast()

	const {
		capitalize,
		categorizedScale,
		isCustomStep,
		isValueDisabled,
		locale,
		removeCustomStepByValue,
	} = useScalePreview()

	function copyTokenName(value: number) {
		if (isValueDisabled(value)) return

		const tokenName = getTokenNameByValue(value)

		if (tokenName) {
			navigator.clipboard.writeText(tokenName)
			showToast(`${$t('copied')}: ${tokenName}`)
		}
	}

	function getTokenNameByValue(value: number): string {
		const unitValue = `${value}${store.settings.unit}`

		return (
			Object.entries(store.tokens.full).find(
				([, value]) => value === unitValue,
			)?.[0] || ''
		)
	}

	watch(
		() => categorizedScale.value,
		() => {
			if (props.scrollContainerRef) {
				emit('scrollToBottom')
			}
		},
		{ flush: 'pre' },
	)
</script>

<style scoped>
	.scale {
		position: relative;
		margin-block: calc(-1 * var(--container-padding-block-start))
			calc(-1 * var(--container-padding-block-end));
	}

	.item {
		position: relative;

		display: grid;
		grid-template-columns: auto 1fr;

		margin-inline: calc(-1 * var(--container-padding-inline));
		padding-inline: var(--container-padding-inline);
		border-block-start: 1px solid var(--color__border);

		transition: background-color var(--animation__duration)
			var(--animation__ease);

		&._disabled {
			opacity: 0.5;
		}

		&:first-child {
			border-block-start: 0;
		}

		&:not(._disabled) {
			cursor: copy;

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					background-color: var(--color__surface);
					transition: none;
				}
			}
		}
	}

	.title {
		padding-block: calc(0.4rem + 0.2em) calc(1rem + 0.35em);
		letter-spacing: calc(0.07rem - 0.07em);
		white-space: nowrap;
	}

	.hint {
		font-style: normal;
		color: var(--color__foreground--muted);
	}

	.button {
		position: absolute;
		inset-block-start: 0.2em;
		inset-inline-end: var(--container-padding-inline);

		display: flex;
		flex-direction: row-reverse;
		column-gap: calc(var(--gap) / 4);

		padding: 0.4rem calc(var(--gap) / 2);
		border: 1px solid var(--color__border);
		border-radius: var(--radius-sm);

		font-size: min(0.875rem, 0.875em);

		background-color: var(--color__muted);

		&:hover {
			background-color: var(--color__muted--hover);
		}
	}
</style>
