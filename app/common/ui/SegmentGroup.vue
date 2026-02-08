<template>
	<SegmentGroupRoot v-bind="forwarded">
		<SegmentGroupItem
			v-for="item in items"
			:key="item.value"
			:value="item.value"
			:disabled="item.disabled"
		>
			<SegmentGroupItemText
				class="text-metrics-fix"
				data-route-transition
			>
				{{ item.label }}
			</SegmentGroupItemText>

			<SegmentGroupItemControl />

			<SegmentGroupItemHiddenInput />

			<AnimatePresence mode="wait">
				<motion.span
					v-if="props.modelValue === item.value"
					layout-id="indicator"
					class="indicator"
					:transition="{ duration: 0.15, ease: 'easeOut' }"
				/>
			</AnimatePresence>
		</SegmentGroupItem>
	</SegmentGroupRoot>
</template>

<script setup lang="ts">
	import {
		SegmentGroupItem,
		SegmentGroupItemControl,
		SegmentGroupItemHiddenInput,
		SegmentGroupItemText,
		SegmentGroupRoot,
		type SegmentGroupRootEmits,
		type SegmentGroupRootProps,
		useForwardPropsEmits,
	} from '@ark-ui/vue'
	import { motion } from 'motion-v'

	interface IProps extends SegmentGroupRootProps {
		items: SegmentItem[]
	}

	interface SegmentItem {
		disabled?: boolean
		label: string
		value: string
	}

	const { items, ...props } = defineProps<IProps>()
	const emits = defineEmits<SegmentGroupRootEmits>()

	const forwarded = useForwardPropsEmits(props, emits)
</script>

<style scoped>
	[data-scope='segment-group'][data-part='root'] {
		isolation: isolate;
		position: relative;

		display: inline-flex;
		align-items: center;

		padding: var(--typography__outline-thickness);
		border-radius: var(--radius-lg);

		background: var(--color__muted);

		&[data-disabled] {
			opacity: var(--color__disabled-state-opacity);
		}

		[data-part='item'] {
			user-select: none;

			position: relative;

			display: flex;
			flex-grow: 1;
			align-items: center;
			justify-content: center;

			padding-block: var(--gap);
			border-radius: calc(
				var(--radius-lg) - var(--typography__outline-thickness)
			);

			color: var(--color__foreground--muted);

			transition:
				color var(--animation__duration) var(--animation__ease),
				box-shadow var(--animation__duration--fast)
					var(--animation__ease-in-out);

			&[data-state='checked'] {
				color: var(--color__foreground);
			}

			&[data-hover] {
				color: var(--color__foreground);
				transition-property: box-shadow;
			}

			&[data-focus-visible] {
				box-shadow: 0 0 0 var(--typography__outline-thickness)
					var(--color__outline);
			}
		}

		[data-part='item-text'] {
			position: relative;
			z-index: 1;
		}

		[data-part='item-control'] {
			display: none;
		}
	}

	.indicator {
		position: absolute;
		inset-block: 0;
		inset-inline: 0;

		border-radius: var(--radius);

		background: var(--color__background);
	}
</style>
