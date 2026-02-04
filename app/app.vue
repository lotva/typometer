<template>
	<NuxtRouteAnnouncer />

	<NuxtLayout>
		<NuxtPage
			:transition="{
				name: transitionName,
				mode: 'out-in',
				onBeforeEnter,
			}"
		/>
	</NuxtLayout>
</template>

<script setup lang="ts">
	const { finalizePendingLocaleChange, locale } = useI18n()

	const transitionName = ref<'locale' | 'route'>('route')
	const previousLocale = ref(locale.value)

	const onBeforeEnter = async () => {
		await finalizePendingLocaleChange()

		const isLocaleChanged = previousLocale.value !== locale.value
		transitionName.value = isLocaleChanged ? 'locale' : 'route'

		previousLocale.value = locale.value
	}
</script>

<style>
	[data-route-transition],
	[data-locale-transition] {
		transition: opacity 1s cubic-bezier(0.075, 0.82, 0.165, 1);

		:is(.locale-enter-from, .locale-leave-to) & {
			opacity: 0;
		}

		.locale-enter-to & {
			opacity: 1;
		}
	}

	[data-route-transition] {
		:is(.route-enter-from, .route-leave-to) & {
			opacity: 0;
		}

		.route-enter-to & {
			opacity: 1;
		}
	}
</style>
