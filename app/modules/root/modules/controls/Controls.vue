<template>
	<section :aria-label="$t('controls')">
		<hgroup data-route-transition>
			<h1 class="title">{{ $t('title') }}</h1>

			<p class="description">{{ $t('description') }}</p>
		</hgroup>
	</section>
</template>

<style scoped>
	.title {
		letter-spacing: var(--typography__tracking--tight);
	}

	.description {
		margin-block-start: calc(var(--gap) * 1.5);
		color: var(--color__foreground--subtitle);
	}
</style>
