<template>
	<div class="tokens">
		<pre
			ref="preRef"
			class="pre"
			:aria-label="$t('preview.generatedTokens')"
		><code class="code" v-html="html"></code></pre>

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
	import { useScaleStore } from '~/modules/root/model/useScaleStore'
	import { useToast } from '~/modules/root/modules/preview/lib/useToast'
	import Toast from '~/modules/root/modules/preview/ui/Toast.vue'

	import { generateTokenHtml } from '../lib/html'

	const { tokens } = toRefs(useScaleStore())
	const { isVisible, message, showToast } = useToast()

	const preRef = useTemplateRef('preRef')

	const html = computed(() => generateTokenHtml(tokens.value))

	function copyCode() {
		const text = preRef.value?.textContent

		if (text) {
			navigator.clipboard.writeText(text)
			showToast($t('copied'))
		}
	}
</script>

<style scoped>
	.tokens {
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

	.code {
		--color__punctuation: #999;
		--color__brackets: #999;
		--color__semi: #999;
		--color__foreground: #b07d48;
		--color__selector: #b07d48;
		--color__value: #2f798a;
		--color__unit: #ab5959;
		--color__operator: #ab5959;
		--color__comment: #a0ada0;

		@media (prefers-color-scheme: dark) {
			--color__punctuation: #a0a0a0;
			--color__brackets: var(--color__foreground);
			--color__semi: var(--color__foreground);
			--color__foreground: var(--color__foreground);
			--color__selector: #a0a0a0;
			--color__value: #ffc799;
			--color__unit: #ffc799;
			--color__operator: #a0a0a0;
			--color__comment: #8b8b8b94;
		}

		&:deep() {
			.punctuation {
				color: var(--color__punctuation);
			}

			.brackets {
				color: var(--color__brackets);
			}

			.semi {
				color: var(--color__semi);
			}

			.selector {
				color: var(--color__selector);
			}

			.property,
			.media {
				color: var(--color__foreground);
			}

			.value,
			.atrule {
				color: var(--color__value);
			}

			.unit {
				color: var(--color__unit);
			}

			.operator {
				color: var(--color__operator);
			}

			.comment {
				color: var(--color__comment);
			}
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
