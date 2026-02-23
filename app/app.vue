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

	<Head>
		<template
			v-for="link in localeHead.link"
			:key="`link-${link.rel}-${link.hreflang || 'default'}`"
		>
			<Link
				:rel="link.rel"
				:href="link.href"
				:hreflang="link.hreflang"
			/>
		</template>

		<template
			v-for="meta in localeHead.meta"
			:key="meta.key"
		>
			<Meta
				:property="meta.property"
				:content="meta.content"
			/>
		</template>
	</Head>
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

	const localeHead = useLocaleHead()

	useHead({
		htmlAttrs: {
			dir: computed(() => localeHead.value.htmlAttrs?.dir as 'ltr' | 'rtl'),
			lang: computed(() => localeHead.value.htmlAttrs?.lang),
		},
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

	useSeoMeta({
		applicationName: computed(() => $t('title')),
		description: computed(() => $t('description')),
		mobileWebAppCapable: 'yes',
		ogDescription: computed(() => $t('description')),
		ogImage: '/open-graph.png',
		ogImageAlt: '',
		ogImageHeight: '630',
		ogImageType: 'image/png',
		ogImageWidth: '1200',
		ogTitle: computed(() => $t('title')),
		ogType: 'website',
		themeColor: [
			{
				content: '#0a0a0a',
				media: '(prefers-color-scheme: dark)',
			},
			{
				content: '#ffffff',
				media: '(prefers-color-scheme: light)',
			},
		],
		title: computed(() => $t('title')),
		twitterCard: 'summary_large_image',
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
