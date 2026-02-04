<template>
	<div>
		<NuxtLink to="/sample-page">Sample Page</NuxtLink>

		<SampleComponent />
	</div>
</template>

<script setup lang="ts">
	import SampleComponent from '../../common/ui/SampleComponent.vue'
</script>
