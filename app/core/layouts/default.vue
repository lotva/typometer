<template>
	<slot></slot>

	<LocaleSwitcher class="switcher" />
</template>

<script setup lang="ts">
	import LocaleSwitcher from '~/common/ui/LocaleSwitcher.vue'
</script>

<style scoped>
	.switcher {
		position: absolute;
		z-index: 10;
		inset-block-start: calc(var(--gap) * 1);
		inset-inline-end: calc(var(--gap) * 1);
	}
</style>
