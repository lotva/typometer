<template>
	<section :aria-label="$t('preview.ariaLabel')">
		<Tabs.Root v-model="previewMode">
			<Tabs.List>
				<Tabs.Trigger
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
				</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="scale">
				{{ store.settings }} {{ store.outputFormat }} {{ previewMode }}
				{{ store.scale }}
			</Tabs.Content>

			<Tabs.Content value="example">Content</Tabs.Content>

			<Tabs.Content value="tokens">
				<Tokens />
			</Tabs.Content>
		</Tabs.Root>
	</section>
</template>

<script setup lang="ts">
	import { Tabs } from '@ark-ui/vue/tabs'
	import { motion } from 'motion-v'

	import type { TPreviewMode } from '../../model/types'

	import { useScaleStore } from '../../model/useScaleStore'
	import Tokens from './ui/Tokens.vue'

	const store = useScaleStore()

	const tabs = [
		{ label: 'preview.scale', value: 'scale' },
		{ label: 'preview.example', value: 'example' },
		{ label: 'preview.tokens', value: 'tokens' },
	]

	const previewMode = computed({
		get: () => store.previewMode,
		set: (value: TPreviewMode) => {
			store.previewMode = value
		},
	})
</script>

<style scoped>
	[data-scope='tabs'][data-part='root'] {
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: center;

		block-size: 100%;

		[data-part='list'] {
			isolation: isolate;
			position: absolute;
			position: fixed;
			inset-block-end: 0;
			inset-block-end: calc(var(--gap) * 2);

			display: inline-flex;
			align-items: center;

			padding: var(--typography__outline-thickness);
			border-radius: var(--radius-lg);

			background-color: var(--color__muted);
		}

		[data-part='trigger'] {
			user-select: none;

			position: relative;

			display: flex;
			flex-grow: 1;
			align-items: center;
			justify-content: center;

			padding: var(--gap) calc(var(--gap) * 2);
			border-radius: calc(
				var(--radius-lg) - var(--typography__outline-thickness)
			);

			color: var(--color__foreground--muted);

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

			border-radius: calc(
				var(--radius-lg) - var(--typography__outline-thickness)
			);

			background: var(--color__background);
		}

		[data-part='content'] {
			inline-size: 100%;
			border: 1px solid var(--color__border);
			border-radius: var(--radius-lg);
		}
	}
</style>
