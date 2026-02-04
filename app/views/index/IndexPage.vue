<template>
	<div>
		<SampleComponent />

		<LanguageSwitcher />
	</div>
</template>

<script setup lang="ts">
	import LanguageSwitcher from '~/common/ui/LanguageSwitcher.vue'

	import SampleComponent from '../../common/ui/SampleComponent.vue'
</script>
