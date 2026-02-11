<template>
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

	const getRouteBaseName = useRouteBaseName()
	const { isLocaleChanging } = useIsLocaleChanging()

	const getPageKey = (route: RouteLocationNormalizedLoaded) => {
		return getRouteBaseName(route) || 'unknown'
	}
</script>

<style>
	[data-route-transition],
	[data-locale-transition] {
		transition: opacity 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);

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
