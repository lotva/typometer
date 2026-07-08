<template>
	<div class="scale">
		<template
			v-for="(item, index) in categorizedScale"
			:key="index"
		>
			<div
				class="item"
				:style="{
					fontSize: `${item.value}px`,
				}"
				@click="copyTokenName(item.value)"
			>
				<p class="title">
					{{ item.value.toLocaleString(locale === 'ru' ? 'ru-RU' : 'en-US') }}
					{{ capitalize(item.category) }}

					<em
						v-if="item.value === store.settings.base"
						class="hint"
						data-route-transition
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

	import { getTokenNameByIndex, getTokenProperty } from '../../tokens'

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
		locale,
		removeCustomStepByValue,
	} = useScalePreview()

	function copyTokenName(value: number) {
		const index = store.scale.indexOf(value)
		if (index === -1) return

		const property = getTokenProperty(
			getTokenNameByIndex(index, {
				outputFormat: store.outputFormat,
				settings: store.settings,
				values: store.scale,
			}),
		)

		if (property) {
			const variable = `var(${property})`

			navigator.clipboard.writeText(variable)
			showToast(`${$t('copied')}: ${variable}`)
		}
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
		cursor: copy;

		position: relative;

		display: grid;
		grid-template-columns: auto 1fr;

		margin-inline: calc(-1 * var(--container-padding-inline));
		padding-inline: var(--container-padding-inline);
		border-block-start: 1px solid var(--color__border);

		transition: background-color var(--animation__duration)
			var(--animation__ease);

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background-color: var(--color__surface);
				transition: none;
			}
		}

		&:first-child {
			border-block-start: 0;
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
