<template>
	<input
		ref="inputRef"
		class="input"
		v-bind="attributes"
	/>
</template>

<script setup lang="ts">
	const attributes = useAttrs()
	const inputRef = ref<HTMLInputElement>()

	defineExpose({
		inputRef,
	})
</script>

<style scoped>
	.input {
		padding: calc(var(--gap) - 0.35em - (1lh - 1em) / 2) var(--gap)
			calc(var(--gap) - 0.15em - (1lh - 1em) / 2) var(--gap);
		border: 1px solid var(--color__input-border);
		border-radius: var(--radius);
		background-color: var(--color__input);

		&:focus-visible {
			border: 1px solid var(--color__input-border--focus);
		}

		&[inputmode='decimal'] {
			font-variant-numeric: tabular-nums;
		}
	}
</style>
