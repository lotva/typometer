<template>
	<aside
		class="copy text-metrics-fix"
		data-route-transition
	>
		{{ $t('copyright.text') }}

		<br />

		<a href="https://github.com/lotva/typometer">
			{{ $t('copyright.sourceCode') }}
		</a>
		·
		<a href="https://lotva.ru">{{ $t('copyright.projects') }}</a>
	</aside>
</template>

<style scoped>
	.copy {
		color: var(--color__foreground--muted);
		text-align: center;
	}
</style>
