<template>
	<section aria-labelledby="presets-title">
		<h2
			id="presets-title"
			class="title"
			data-route-transition
		>
			{{ $t('controls.presets') }}
		</h2>

		<ul class="list">
			<li
				v-for="preset in PRESETS"
				:id="`preset-${preset.id}`"
				:key="preset.id"
				class="item"
			>
				<button
					type="button"
					class="button"
					:aria-pressed="preset.id === store.activePresetId"
					:tabindex="preset.id === store.activePresetId ? -1 : 0"
					@click="handlePresetClick(preset.id)"
				>
					<span
						class="text-metrics-fix"
						data-route-transition
					>
						{{ $t(preset.i18nNameKey) }}
					</span>
				</button>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	import { PRESETS } from '../../../config/presets'

	const store = useScaleStore()

	function handlePresetClick(presetId: string) {
		store.applyPreset(presetId)
	}
</script>

<style scoped>
	.title {
		font: inherit;
	}

	.list {
		display: grid;
		row-gap: calc(var(--gap) / 2);
		margin-block-start: var(--gap);
	}

	.button {
		inline-size: 100%;
		padding: calc(var(--gap) * 1) calc(var(--gap) / 2) calc(var(--gap) * 2);
		border-radius: var(--radius);

		text-align: start;

		background-color: var(--color__muted);

		&:hover {
			background-color: var(--color__muted--hover);
		}

		&[aria-pressed='true'] {
			color: var(--color__background);
			background-color: var(--color__primary);
		}
	}
</style>
