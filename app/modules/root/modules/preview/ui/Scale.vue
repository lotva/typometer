<template>
	<div class="scale">
		<div
			class="preview"
			:style="fluidRootStyle"
		>
			<p
				:id="probeLegendId"
				class="visually-hidden"
			>
				{{ $t('preview.probeLegend') }}
			</p>

			<ul
				ref="listRef"
				:aria-label="$t('preview.scaleTableCaption')"
				:aria-describedby="probeLegendId"
			>
				<ScaleRow
					v-for="item in categorizedScale"
					:key="item.offset"
					:item="item"
					:viewport-width="renderedViewportWidth"
					@copy="copyTokenName"
				/>
			</ul>
		</div>

		<SliderViewport class="slider" />

		<Toast
			:message="message"
			:is-visible="isVisible"
		/>
	</div>
</template>

<script setup lang="ts">
	import { useScaleStore } from '../../../model/useScaleStore'
	import { getTokenNameByIndex, getTokenProperty } from '../../tokens'
	import { useScalePreview } from '../lib/useScalePreview'
	import { useScaleScrollAnchor } from '../lib/useScaleScrollAnchor'
	import { useToast } from '../lib/useToast'
	import ScaleRow from './ScaleRow.vue'
	import SliderViewport from './SliderViewport.vue'
	import Toast from './Toast.vue'

	const props = defineProps<{
		scrollContainerRef: null | { $el: HTMLElement }
	}>()

	const store = useScaleStore()

	const { isVisible, message, showToast } = useToast()

	const { categorizedScale, fluidRootStyle, renderedViewportWidth } =
		useScalePreview()

	const listRef = useTemplateRef<HTMLElement>('listRef')
	const probeLegendId = useId()

	function copyTokenName(value: number) {
		const index = store.scale.findIndex((point) => point.value === value)
		if (index === -1) return

		const property = getTokenProperty(
			getTokenNameByIndex(index, {
				outputFormat: store.outputFormat,
				scale: store.scale,
				settings: store.settings,
			}),
		)

		if (property) {
			const variable = `var(${property})`

			navigator.clipboard.writeText(variable)
			showToast(`${$t('copied')}: ${variable}`)
		}
	}

	useScaleScrollAnchor({
		layoutSignal: renderedViewportWidth,
		listRef,
		scrollContainerRef: () => props.scrollContainerRef?.$el,
	})
</script>

<style scoped>
	.scale {
		overflow-anchor: none;

		position: relative;

		display: flex;
		flex-direction: column;

		min-block-size: 100%;
	}

	.preview {
		--progress: clamp(
			0,
			(var(--w) - var(--vw-min)) / (var(--vw-max) - var(--vw-min)),
			1
		);
		--base: calc(
			var(--base-min) + (var(--base-max) - var(--base-min)) * var(--progress)
		);
		--ratio: calc(
			var(--ratio-min) + (var(--ratio-max) - var(--ratio-min)) * var(--progress)
		);

		container-name: scale-preview;
		container-type: inline-size;
		flex: 1 1 auto;
		margin-block: calc(-1 * var(--container-padding-block-start))
			calc(-1 * var(--container-padding-block-end));

		@media (--desktop) {
			margin-block-end: 0;
		}
	}

	.slider {
		position: sticky;
		z-index: 5;
		inset-block-end: calc(-1 * var(--container-padding-block-end));

		grid-template-columns: min(100%, max(50%, 24em));
		justify-content: center;

		max-inline-size: none;
		margin-block-end: calc(-1 * var(--container-padding-block-end));
		margin-inline: calc(-1 * var(--container-padding-inline));
		padding-block: calc(var(--gap) * 1.5) var(--container-padding-block-end);
		padding-inline: var(--container-padding-inline);

		background-image: linear-gradient(
			to bottom,
			transparent 0%,
			var(--color__background) 10%
		);

		@media (--mobile) {
			display: none;
		}
	}
</style>
