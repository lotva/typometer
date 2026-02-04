<template>
	<aside
		class="switcher"
		:aria-label="$t('switchLanguage')"
	>
		<SwitchLocalePathLink
			v-for="locale in locales"
			:key="locale.code"
			:locale="locale.code"
			class="locale-link box"
			@mouseover="preloadLocale(locale.code)"
		>
			<span class="label capitals text-metrics-fix">
				{{ locale.code.toUpperCase() }}
			</span>

			<AnimatePresence mode="wait">
				<motion.span
					v-if="selectedLocale === locale.code"
					layout-id="backdrop"
					class="backdrop"
					:transition="{ duration: 0.1 }"
				/>
			</AnimatePresence>
		</SwitchLocalePathLink>
	</aside>
</template>

<script setup lang="ts">
	import type { LocaleInfo } from '@nuxtjs/i18n'

	import { AnimatePresence, motion } from 'motion-v'

	const { loadLocaleMessages, locale: selectedLocale, locales } = useI18n()

	const preloadLocale = async (target: LocaleInfo['code']) => {
		if (selectedLocale.value === target) return
		await loadLocaleMessages(target)
	}
</script>

<style scoped>
	.switcher {
		display: flex;
	}

	:deep(.locale-link) {
		position: relative;

		padding: calc(
				var(--gap) / 2 + var(--typography__surface-capital-compensator)
			)
			calc(var(--gap) * 1) calc(var(--gap) / 2);
		border-radius: var(--radius);

		color: var(--color__foreground);
		text-decoration: none;

		&[aria-current='page'] {
			cursor: default;
		}

		&:not([aria-current='page']):hover {
			color: var(--color__foreground--strong);
		}
	}

	.label {
		position: relative;
		z-index: 2;
	}

	.backdrop {
		position: absolute;
		inset-block: 0;
		inset-inline: 0;

		border-radius: var(--radius);

		background: var(--color__muted);
	}
</style>
