<template>
	<div
		class="tokens"
		v-html="html"
	></div>
</template>

<script setup lang="ts">
	import { codeToHtml } from 'shiki'

	import { useScaleStore } from '~/modules/root/model/useScaleStore'

	const { css } = toRefs(useScaleStore())

	const html = ref('')

	watch(
		css,
		async (updated) => {
			if (updated) {
				html.value = await codeToHtml(updated, {
					colorReplacements: {
						'#000': 'var(--color__background)',
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
			scrollbar-width: thin;

			overflow-block: hidden;
			overflow-inline: auto;

			padding: var(--gap) calc(var(--gap) / 2) calc(var(--gap) * 2);
			border-radius: var(--radius-lg);

			font-size: 0.84rem;
			line-height: 1.5;

			background-color: var(--color__surface);
		}

		code {
			user-select: all;
		}
	}
</style>
