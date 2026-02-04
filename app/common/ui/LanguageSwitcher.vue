<template>
	<aside :aria-label="$t('switchLanguage')">
		<SwitchLocalePathLink
			locale="ru"
			@mouseover="preloadLocale('ru')"
		>
			RU
		</SwitchLocalePathLink>

		<SwitchLocalePathLink
			locale="en"
			@mouseover="preloadLocale('en')"
		>
			EN
		</SwitchLocalePathLink>
	</aside>
</template>

<script setup lang="ts">
	import type { LocaleInfo } from '@nuxtjs/i18n'

	const { loadLocaleMessages, locale } = useI18n()

	const preloadLocale = async (target: LocaleInfo['code']) => {
		if (locale.value === target) return
		await loadLocaleMessages(target)
	}
</script>
