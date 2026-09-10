<template>
	<div
		class="tokens"
		data-syntax-theme="vesper"
	>
		<pre
			ref="preRef"
			class="pre"
			:aria-label="$t('preview.generatedTokens')"
		><code class="language-css">{{ css }}</code></pre>

		<button
			type="button"
			class="action"
			@click="copyCode"
		>
			<span
				class="text-metrics-fix"
				data-route-transition
			>
				{{ $t('preview.copyCss') }}
			</span>
		</button>

		<Toast
			:message="message"
			:is-visible="isVisible"
		/>
	</div>
</template>

<script setup lang="ts">
	import { highlightAll } from 'microlighter'

	import { useScaleStore } from '~/modules/root/model/useScaleStore'
	import { useToast } from '~/modules/root/modules/preview/lib/useToast'
	import Toast from '~/modules/root/modules/preview/ui/Toast.vue'

	const { css } = toRefs(useScaleStore())
	const { isVisible, message, showToast } = useToast()

	const preRef = useTemplateRef('preRef')

	async function highlightCode() {
		await nextTick()

		if (!preRef.value || typeof CSS === 'undefined' || !('highlights' in CSS)) {
			return
		}

		await highlightAll({ root: preRef.value })
	}

	onMounted(highlightCode)
	watch(css, highlightCode, { flush: 'post' })

	function copyCode() {
		if (css.value) {
			navigator.clipboard.writeText(css.value)
			showToast($t('copied'))
		}
	}
</script>

<style scoped>
	.tokens {
		--syntax-background: transparent;
		--syntax-foreground: var(--color__foreground);

		display: grid;
	}

	.pre,
	.action {
		grid-area: 1 / 1;
	}

	.action {
		position: sticky;
		z-index: 1;
		inset-block-start: 0;

		place-self: start end;

		padding: calc(
				var(--gap) * 0.5 + var(--typography__surface-capital-compensator)
			)
			calc(var(--gap) * 0.75) calc(var(--gap) * 0.5);
		border: 1px solid var(--color__border);
		border-radius: var(--radius-sm);

		font-size: 0.875rem;

		background-color: var(--color__muted);

		&:hover {
			background-color: var(--color__muted--hover);
		}
	}

	.pre {
		max-inline-size: 100%;

		font-size: 0.84rem;
		line-height: 1.5;
		tab-size: 2;
		white-space: pre-wrap;

		@media (--mobile) {
			font-variation-settings: 'wdth' 90;
		}
	}
</style>
