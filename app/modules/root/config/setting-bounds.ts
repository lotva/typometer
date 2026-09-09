import { clamp } from '../lib/scale'

export const BASE_BOUNDS = { max: 32, min: 14 } as const
export const RATIO_BOUNDS = { max: 2, min: 1.1 } as const
export const VIEWPORT_BOUNDS = { max: 2560, min: 320 } as const
export const GRID_STEP_BOUNDS = { max: 16, min: 2 } as const
export const STEPS_BOUNDS = { max: 4, min: 0 } as const

export function clampRange(
	[min, max]: [number, number],
	bounds: { max: number; min: number },
): [number, number] {
	return [
		clamp(min, bounds.min, bounds.max),
		clamp(max, bounds.min, bounds.max),
	]
}
