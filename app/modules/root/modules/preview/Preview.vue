<template>
	<div>
		{{ settings }} {{ outputFormat }} {{ previewMode }} {{ css }} {{ scale }}
	</div>
</template>

<script setup lang="ts">
	import { useScaleStore } from '../../model/useScaleStore'

	const { css, outputFormat, previewMode, scale, settings } =
		storeToRefs(useScaleStore())
</script>
