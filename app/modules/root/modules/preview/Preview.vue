<template>
	<section
		class="section"
		:aria-label="$t('preview.ariaLabel')"
	>
		<TabsRoot v-model="previewMode">
			<TabList>
				<TabTrigger
					v-for="{ value, label } in tabs"
					:key="value"
					:value="value"
				>
					<span
						class="trigger-text text-metrics-fix"
						data-route-transition
					>
						{{ $t(label) }}
					</span>

					<AnimatePresence mode="wait">
						<motion.span
							v-if="previewMode === value"
							layout-id="preview-tabs-indicator"
							class="indicator"
							:transition="{ duration: 0.15, ease: 'easeOut' }"
						/>
					</AnimatePresence>

					<span
						v-if="previewMode === value"
						class="indicator _mobile"
					></span>
				</TabTrigger>
			</TabList>

			<TabContent
				id="scale-tab-content"
				ref="scaleTabContent"
				value="scale"
				class="box"
			>
				<Scale
					:scroll-container-ref="scaleTabContent"
					@scroll-to-bottom="handleScrollToBottom"
				/>
			</TabContent>

			<!-- eslint-disable -->
			<component
				:is="'script'"
				v-once
				v-html="scrollBeforeRenderScript"
			/>

			<TabContent
				value="example"
				class="box"
			>
				Content
			</TabContent>

			<TabContent
				value="tokens"
				class="box"
			>
				<Tokens />
			</TabContent>
		</TabsRoot>
	</section>
</template>

<script setup lang="ts">
	import { TabContent, TabList, TabsRoot, TabTrigger } from '@ark-ui/vue'
	import { motion } from 'motion-v'

	import type { TPreviewMode } from '../../model/types'

	import { useScaleStore } from '../../model/useScaleStore'
	import { useSyncWithHash } from '../../model/useSyncWithHash'
	import { scrollBeforeRenderScript } from './lib/scrollBeforeRenderScript'
	import Scale from './ui/Scale.vue'
	import Tokens from './ui/Tokens.vue'

	const store = useScaleStore()
	useSyncWithHash()

	const tabs = [
		{ label: 'preview.scale', value: 'scale' },
		{ label: 'preview.example', value: 'example' },
		{ label: 'preview.tokens', value: 'tokens' },
	]

	const scaleTabContent = ref<null | { $el: HTMLDivElement }>(null)

	function handleScrollToBottom() {
		if (!scaleTabContent.value) return
		const element = scaleTabContent.value.$el

		const scrollPosition = element.clientHeight + element.scrollTop
		const isAtBottom = Math.abs(element.scrollHeight - scrollPosition) < 1

		if (isAtBottom) {
			nextTick(() => (element.scrollTop = element.scrollHeight))
		}
	}

	const previewMode = computed({
		get: () => store.previewMode,
		set: (value: TPreviewMode) => {
			store.previewMode = value
		},
	})
</script>

<style scoped>
	.section {
		block-size: 100%;
	}

	[data-scope='tabs'][data-part='root'] {
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: center;

		block-size: 100%;

		[data-part='list'] {
			--header-height: calc(var(--gap) * 2.7);

			isolation: isolate;
			position: sticky;
			z-index: 10;
			inset-block-start: var(--gap);

			display: inline-flex;
			align-items: center;

			margin-block: calc(var(--gap) / 2) calc(var(--gap) * 2);
			padding: var(--typography__outline-thickness);
			border-radius: var(--radius-lg);

			background-color: var(--color__muted);

			@media (--desktop) {
				position: fixed;
				inset-block: auto calc(var(--gap) * 2);
				margin-block: 0;
			}
		}

		[data-part='trigger'] {
			user-select: none;

			position: relative;

			display: flex;
			flex-grow: 1;
			align-items: center;
			justify-content: center;

			padding: calc(var(--gap) * 0.75) calc(var(--gap) * 1.5);
			border-radius: calc(
				var(--radius-lg) - var(--typography__outline-thickness)
			);

			color: var(--color__foreground--muted);

			@media (--desktop) {
				padding-block: var(--gap);
			}

			&[aria-selected='true'] {
				color: var(--color__foreground);
			}

			&:hover {
				color: var(--color__foreground);
				transition-property: box-shadow;
			}

			&:focus-visible {
				box-shadow: 0 0 0 var(--typography__outline-thickness)
					var(--color__outline);
			}
		}

		.trigger-text {
			position: relative;
			z-index: 1;
		}

		.indicator {
			position: absolute;
			inset-block: 0;
			inset-inline: 0;

			display: none;

			border-radius: calc(
				var(--radius-lg) - var(--typography__outline-thickness)
			);

			background-color: var(--color__background);

			@media (--desktop) {
				display: inline;
			}

			&._mobile {
				display: inline;

				@media (--desktop) {
					display: none;
				}
			}
		}

		[data-part='content'] {
			--container-padding-inline: calc(var(--gap) / 2);
			--container-padding-block-start: var(--gap);
			--container-padding-block-end: calc(var(--gap) * 2);

			scrollbar-color: var(--color__border) transparent;
			scrollbar-width: thin;

			overflow-inline: hidden;

			inline-size: 100%;
			padding-block: var(--container-padding-block-start)
				var(--container-padding-block-end);
			padding-inline: var(--container-padding-inline);
			border-block-start: 1px solid var(--color__border);

			transition: box-shadow var(--animation__duration--fast)
				var(--animation__ease-in-out);

			@media (--desktop) {
				overflow-block: auto;
				overscroll-behavior: contain;

				margin-block-start: calc(-1 * var(--gap));
				border: 1px solid var(--color__border);
				border-radius: var(--radius-lg);
			}
		}
	}
</style>
