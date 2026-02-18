<template>
	<div
		class="tokens"
		v-html="html"
	></div>
</template>

<script setup lang="ts">
	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	import { highlighter } from '../lib/highlighter'

	const { css } = toRefs(useScaleStore())

	const html = ref('')

	watch(
		css,
		async (updated) => {
			if (updated) {
				html.value = highlighter.codeToHtml(updated, {
					colorReplacements: {
						'#393a34': 'var(--color__foreground--muted)',
						'#101010': 'var(--color__background)',
						'#fff': 'var(--color__foreground)',
					},
					lang: 'css',
					themes: {
						dark: 'vesper',
						light: 'vitesse-light',
					},
				})
			}
		},
		{ immediate: true },
	)
</script>

<style scoped>
	.tokens :deep() {
		@media (prefers-color-scheme: dark) {
			.shiki,
			.shiki span {
				font-weight: var(--shiki-dark-font-weight) !important;
				font-style: var(--shiki-dark-font-style) !important;
				color: var(--shiki-dark) !important;
				text-decoration: var(--shiki-dark-text-decoration) !important;

				background-color: var(--shiki-dark-bg) !important;
			}
		}

		pre {
			max-inline-size: 100%;
			margin-block: calc(-1 * var(--container-padding-block-start))
				calc(-1 * var(--container-padding-block-end));
			margin-inline: calc(-1 * var(--container-padding-inline));
			padding-block: var(--container-padding-block-start)
				var(--container-padding-block-end);
			padding-inline: var(--container-padding-inline);

			font-size: 0.84rem;
			line-height: 1.5;
			white-space: pre-wrap;
		}
	}
</style>
