import type { TPreviewMode } from '~/modules/root/model/types'

import { scrollPositions } from '~/router.options'

export const usePreviewMode = () => {
	const route = useRoute()
	const router = useRouter()

	const previewMode = computed({
		get: () => (route.query.tab as TPreviewMode) ?? 'scale',
		set: (value: TPreviewMode) => {
			router.replace({
				query: {
					...route.query,
					tab: value,
				},
			})
		},
	})

	watch(
		() => route.query.tab,
		(_, previousTab) => {
			if (previousTab) {
				scrollPositions.set(previousTab as string, window.scrollY)
			}
		},
	)

	return {
		previewMode,
	}
}
