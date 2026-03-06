<template>
	<pre class="pre"><code class="code" v-html="html"></code></pre>
</template>

<script setup lang="ts">
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	import { generateTokenHtml } from '../lib/html'

	const { tokens } = toRefs(useScaleStore())

	const html = computed(() => generateTokenHtml(tokens.value))
</script>

<style scoped>
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
		margin-block: calc(-1 * var(--container-padding-block-start))
			calc(-1 * var(--container-padding-block-end));
		margin-inline: calc(-1 * var(--container-padding-inline));
		padding-block: var(--container-padding-block-start)
			var(--container-padding-block-end);
		padding-inline: var(--container-padding-inline);

		font-size: 0.84rem;
		line-height: 1.5;
		tab-size: 2;
		white-space: pre-wrap;
	}
</style>
