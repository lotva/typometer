export function useRafSyncedRef(source: Ref<number>) {
	const synced = ref(source.value)
	let rafId = 0

	watch(source, (value) => {
		cancelAnimationFrame(rafId)
		rafId = requestAnimationFrame(() => {
			synced.value = value
		})
	})

	onScopeDispose(() => {
		cancelAnimationFrame(rafId)
	})

	return synced
}
