import type { TOutputFormat, TUnit } from '~/modules/root/model/types'

import { useScaleStore } from '~/modules/root/model/useScaleStore'

export default defineNuxtPlugin(() => {
	const route = useRoute()
	const store = useScaleStore()

	const applyParameters = () => {
		const { query } = route

		if (query.unit) store.updateSettings({ unit: query.unit as TUnit })

		if (query.base) store.updateBase(Number(query.base), store.settings.unit)

		if (query.ratio) store.updateSettings({ ratio: Number(query.ratio) })

		if (query.steps) store.updateIntermediateSteps(Number(query.steps))

		if (query.snap) {
			store.updateSettings({ shouldSnapToGrid: String(query.snap) === 'true' })
		}

		if (query.module) {
			store.updateGridStep(Number(query.module), store.settings.unit)
		}

		if (query.format) store.outputFormat = query.format as TOutputFormat

		if (query.custom) {
			store.settings.customSteps = decodeCustomSteps(query.custom as string)
		}
	}

	applyParameters()
})

const decodeCustomSteps = (encoded: string) => {
	try {
		return JSON.parse(atob(encoded))
	} catch {
		return []
	}
}
