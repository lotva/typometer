import { storeToRefs } from 'pinia'

import { capitalize } from '~/common/lib/capitalize'
import { useRafSyncedRef } from '~/common/lib/useRafSyncedRef'

import { getFluidBaseBounds } from '../../../lib/scale'
import { useScaleStore } from '../../../model/useScaleStore'
import { categorizeToken } from '../../tokens'
import { GRID_STEP_VAR } from '../../tokens/lib/fluid-token'

export type TScalePreviewItem = {
	category: string
	offset: number
	value: number
}

export function useScalePreview() {
	const store = useScaleStore()
	const { currentViewportWidth: viewportWidth } = storeToRefs(store)

	const renderedViewportWidth = useRafSyncedRef(viewportWidth)

	const categorizedScale = computed<TScalePreviewItem[]>(() =>
		store.scale
			.map((point) => ({
				category: capitalize(
					categorizeToken(point.value, store.settings.baseMax).name,
				),
				offset: point.exponent,
				value: point.value,
			}))
			.toReversed(),
	)

	const fluidRootStyle = computed(() => {
		const { baseMax, baseMin } = getFluidBaseBounds(store.settings)

		return {
			'--base-max': String(baseMax),
			'--base-min': String(baseMin),
			'--ratio-max': String(store.settings.ratioMax),
			'--ratio-min': String(store.settings.ratioMin),
			'--step': `calc(1 / ${store.settings.intermediateSteps + 1})`,
			'--steps': String(store.settings.intermediateSteps + 1),
			'--vw-max': String(store.settings.viewportMax),
			'--vw-min': String(store.settings.viewportMin),
			'--w': String(renderedViewportWidth.value),
			...(store.settings.shouldSnapToGrid && {
				[GRID_STEP_VAR]: `${store.settings.gridStep}px`,
			}),
		}
	})

	return {
		categorizedScale,
		fluidRootStyle,
		renderedViewportWidth,
	}
}
