<template>
	<AppLoader />

	<NuxtRouteAnnouncer />

	<NuxtLayout>
		<NuxtPage
			:transition="{
				name: 'route',
				mode: 'out-in',
			}"
			:class="{
				'is-locale-changing': isLocaleChanging,
			}"
			:page-key="getPageKey"
		/>
	</NuxtLayout>
</template>

<script setup lang="ts">
	import type { RouteLocationNormalizedLoaded } from 'vue-router'

	import { useIsLocaleChanging } from './common/lib/useIsLocaleChanging'
	import AppLoader from './common/ui/AppLoader.vue'
	import { SHOW_LOADER_SCRIPT, SHOW_LOADER_STYLE } from './core/lib/show-loader'

	const getRouteBaseName = useRouteBaseName()
	const { isLocaleChanging } = useIsLocaleChanging()

	const getPageKey = (route: RouteLocationNormalizedLoaded) => {
		return getRouteBaseName(route) || 'unknown'
	}

	useHead({
		script: [
			{
				innerHTML: SHOW_LOADER_SCRIPT,
			},
		],
		style: [
			{
				innerHTML: SHOW_LOADER_STYLE,
			},
		],
	})

	onMounted(() => {
		nextTick(() => {
			document.documentElement.classList.remove('_loading')
		})
	})
</script>

<style>
	[data-route-transition],
	[data-locale-transition] {
		transition: opacity var(--animation__duration--transition)
			var(--animation__timing--transition);

		.is-locale-changing & {
			opacity: 0;
			transition: none;
		}
	}

	[data-route-transition] {
		:is(.route-enter-from, .route-leave-active) & {
			opacity: 0;
			transition: none;
		}
	}
</style>
