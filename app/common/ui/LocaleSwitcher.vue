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
			:data-locale="locale.code"
			:data-selected="locale.code === selectedLocale"
			@mouseover="preloadLocale(locale.code)"
		>
			<span class="label capitals text-metrics-fix">
				{{ locale.code.toUpperCase() }}
			</span>
		</SwitchLocalePathLink>
	</aside>
</template>

<script setup lang="ts">
	import type { LocaleInfo } from '@nuxtjs/i18n'

	const { loadLocaleMessages, locale: selectedLocale, locales } = useI18n()

	const preloadLocale = async (target: LocaleInfo['code']) => {
		if (selectedLocale.value === target) return
		await loadLocaleMessages(target)
	}
</script>

<style scoped>
	.switcher {
		--width: 50%;

		display: flex;

		&::before {
			content: '';

			position: absolute;
			inset-block: 0;
			inset-inline-start: var(--left);

			inline-size: var(--width);
			border-radius: var(--radius);

			background-color: var(--color__muted);

			transition-timing-function: var(--animation__ease-in-out);
			transition-duration: var(--animation__duration--fast);
			transition-property: left;
		}

		&:has([data-selected='true'][data-locale='ru']) {
			--left: 50%;
		}

		&:has([data-selected='true'][data-locale='en']) {
			--left: 0;
		}
	}

	:deep(.locale-link) {
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
</style>
