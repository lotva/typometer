import type { IBreakpoint, ITokenContext, TBreakpointKey } from '../model'

import { PREFIX } from '../config'
import { getTokenNameByIndex } from './naming'
import { categorizeToken, findClosestIndex, format } from './utilities'

const ACCESSIBILITY_MAX_MULTIPLIER = 6
const PRECISION = 3

const BREAKPOINTS: IBreakpoint[] = [
	{ key: 'root', maxRatio: 2.2, minWidth: 0, rootScale: 1 },
	{ key: 'width >= 768px', maxRatio: 2.6, minWidth: 768, rootScale: 1 },
	{ key: 'width >= 1024px', maxRatio: 3, minWidth: 1024, rootScale: 1 },
	{
		key: 'width >= 1440px',
		maxRatio: Number.POSITIVE_INFINITY,
		minWidth: 1440,
		rootScale: 1,
	},
]

export function generateMobileFirstTokens(
	context: ITokenContext,
): Record<TBreakpointKey, Record<string, string>> {
	const { settings, values } = context
	const base = settings.base
	const unit = settings.unit

	const infos = buildTokenInfos(context)
	const shift = getShiftAmount(settings.intermediateSteps)
	const baseIndex = findClosestIndex(values, base)

	const rootRaw = values.slice()
	const desktopRaw = computeDesktopRaw(values, baseIndex, shift)

	const targets = computeTargetsPerBreakpoint(
		values,
		base,
		rootRaw,
		desktopRaw,
		infos,
	)

	const result: Record<TBreakpointKey, Record<string, string>> = {
		root: {},
		'width >= 768px': {},
		'width >= 1024px': {},
		'width >= 1440px': {},
	}

	for (let i = 0; i < BREAKPOINTS.length; i++) {
		const breakpoint = BREAKPOINTS[i]
		const next = BREAKPOINTS[i + 1]

		if (!breakpoint) continue

		for (const [infoIndex, info] of infos.entries()) {
			const minValue = targets[i]?.[infoIndex]
			if (minValue === undefined) continue

			if (!next) {
				result[breakpoint.key][info.cssVariable] =
					`${format(minValue, PRECISION)}${unit}`
				continue
			}

			const maxValue = targets[i + 1]?.[infoIndex]
			if (maxValue === undefined) continue

			result[breakpoint.key][info.cssVariable] =
				Math.abs(maxValue - minValue) < 1e-9
					? `${format(minValue, PRECISION)}${unit}`
					: buildClamp(
							minValue,
							maxValue,
							breakpoint.minWidth,
							next.minWidth,
							unit,
						)
		}
	}
	return result
}

function buildClamp(
	min: number,
	max: number,
	minW: number,
	maxW: number,
	unit: string,
) {
	const deltaW = Math.max(1, maxW - minW)
	const slope = ((max - min) / deltaW) * 100

	const intercept = min - (slope / 100) * minW
	const slopeS = format(slope, PRECISION)
	const interceptS = format(intercept, PRECISION)

	const minS = format(min, PRECISION)
	const maxS = format(max, PRECISION)

	return `clamp(${minS}${unit}, ${slopeS}vw + ${interceptS}${unit}, ${maxS}${unit})`
}

function buildTokenInfos(context: ITokenContext) {
	return context.values.map((value, index) => {
		const name = getTokenNameByIndex(index, context)
		const cssVariable = name ? `${PREFIX}--${name}` : `${PREFIX}`

		const category = categorizeToken(value, context.settings.base).name

		return { category, cssVariable, index, value }
	})
}

function computeDesktopRaw(
	values: number[],
	baseIndex: number,
	shift: number,
): number[] {
	return values.map((value, index) => {
		if (index <= baseIndex || shift <= 0) return value

		const targetIndex = index + shift
		const lowerIndex = Math.floor(targetIndex)

		if (lowerIndex >= values.length) {
			return values[values.length - 1]!
		}

		const clampedIndex = Math.min(targetIndex, values.length - 1)
		const lowerClamped = Math.floor(clampedIndex)
		const upperClamped = Math.ceil(clampedIndex)

		if (lowerClamped === upperClamped) {
			return values[lowerClamped]!
		}

		const frac = clampedIndex - lowerClamped
		const lower = values[lowerClamped]!
		const upper = values[upperClamped]!

		return lower + (upper - lower) * frac
	})
}

function computeTargetsPerBreakpoint(
	values: number[],
	base: number,
	rootRaw: number[],
	desktopRaw: number[],
	infos: { category: string }[],
): number[][] {
	const targets = BREAKPOINTS.map(() => Array(values.length).fill(0))

	for (let index = 0; index < values.length; index++) {
		const isHeading = infos[index]?.category === 'heading'

		for (const [breakpointIndex, breakpoint] of BREAKPOINTS.entries()) {
			const t = breakpoint.minWidth / 1440

			const raw = rootRaw[index]! + (desktopRaw[index]! - rootRaw[index]!) * t

			let capped = Math.min(raw, base * breakpoint.maxRatio)
			if (isHeading) {
				capped = Math.min(capped, base * ACCESSIBILITY_MAX_MULTIPLIER)
			}
			targets[breakpointIndex]![index] = capped
		}
	}

	return targets
}

function getShiftAmount(steps: number) {
	if (steps >= 4) return 2.25
	if (steps >= 2) return 1.25
	if (steps === 1) return 0.75

	return 0
}
