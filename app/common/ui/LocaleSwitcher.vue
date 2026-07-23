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
			replace
			@mouseover="preloadLocale(locale.code)"
		>
			<span
				class="visually-hidden"
				:lang="locale.code"
			>
				{{ $t(`languages.${locale.code}`) }}
			</span>

			<span
				class="label capitals text-metrics-fix"
				aria-hidden="true"
			>
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
		--width: calc(50% - var(--typography__outline-thickness));

		display: flex;

		padding: var(--typography__outline-thickness);
		border-radius: calc(var(--radius) + var(--typography__outline-thickness));

		font-size: var(--fs-s);

		background-color: var(--color__muted);

		&::before {
			content: '';

			position: absolute;
			inset-block: var(--typography__outline-thickness);
			inset-inline-start: var(--left);

			inline-size: var(--width);
			border-radius: var(--radius);

			background-color: var(--color__background);

			transition-timing-function: var(--animation__ease-in-out);
			transition-duration: var(--animation__duration--fast);
			transition-property: left;
		}

		&:has([data-selected='true'][data-locale='ru']) {
			--left: 50%;
		}

		&:has([data-selected='true'][data-locale='en']) {
			--left: var(--typography__outline-thickness);
		}
	}

	:deep(.locale-link) {
		padding: calc(
				var(--gap) * 0.5 + var(--typography__surface-capital-compensator)
			)
			calc(var(--gap) * 0.75) calc(var(--gap) * 0.5);
		border-radius: var(--radius);
		color: var(--color__foreground--muted);
		text-decoration: none;

		&[aria-current='page'] {
			cursor: default;
			color: var(--color__foreground);
		}

		&:not([aria-current='page']):hover {
			color: var(--color__foreground);
		}
	}

	.label {
		position: relative;
		z-index: 2;
	}
</style>
