interface IOptions {
	initialIndex?: number
	positions?: number[]
}

interface IReferences {
	contentRef: Ref<HTMLElement | null>
	drawerRef: Ref<HTMLElement | null>
	handleRef: Ref<HTMLElement | null>
	spacerRef: Ref<HTMLElement | null>
}

/**
 * Time window (ms) to compute velocity
 */
const VELOCITY_WINDOW = 120
/**
 * Factor applied to velocity to calculate flick projection (px per (px/ms) * factor)
 */
const VELOCITY_FACTOR = 300
/**
 * Minimal velocity (px/ms) to consider it a flick
 */
const MIN_FLICK_VELOCITY = 0.01
/**
 * Animate duration (ms) for snapping to target
 */
const SNAP_DURATION = 300

let resizeObserver: null | ResizeObserver = null

export function useDrawer(
	{ contentRef, drawerRef, handleRef, spacerRef }: IReferences,
	options: IOptions,
) {
	const positions = options.positions?.slice() ?? [0, 300, 600]

	const initialIndex = Math.max(
		0,
		Math.min(
			options.initialIndex ?? positions.length - 1,
			positions.length - 1,
		),
	)

	const extraBodyOffset = 0

	const isDragging = ref(false)
	const isExpanded = ref(initialIndex === 0)
	const currentIndex = ref(initialIndex)

	let startY = 0
	let startTranslate = 0
	let lastMoves: Array<{ t: number; y: number }> = []
	let rafId = 0
	let originalBodyPadding = ''

	function getDrawerHeight() {
		if (!drawerRef.value) return 0
		return drawerRef.value.getBoundingClientRect().height
	}

	function updateBodyPaddingForTranslate(translateY: number) {
		if (!isMobile()) return

		const drawerHeight = getDrawerHeight()
		const visible = Math.max(0, drawerHeight - translateY)
		const total = visible + extraBodyOffset
		document.body.style.paddingBottom = `${Math.ceil(total)}px`
	}

	function saveAndApplyBodyPaddingInitial() {
		if (!isMobile()) return

		if (originalBodyPadding === '') {
			originalBodyPadding = document.body.style.paddingBottom || ''
		}
		updateBodyPaddingForTranslate(getCurrentTranslate()!)
	}

	function setTranslate(y: number, applyStyle = true) {
		const clamped = clamp(y, positions[0]!, positions[positions.length - 1]!)

		if (applyStyle && drawerRef.value && spacerRef.value) {
			drawerRef.value.style.transform = `translateY(${clamped}px)`
			spacerRef.value.style.height = `${clamped}px`

			updateBodyPaddingForTranslate(clamped)
		}

		return clamped
	}

	function getCurrentTranslate() {
		if (!drawerRef.value) return positions[currentIndex.value]!

		const t = drawerRef.value.style.transform
		if (!t) return positions[currentIndex.value]!

		const m = t.match(/translateY\((-?\d+\.?\d*)px\)/)
		if (m) return Number(m[1])

		return positions[currentIndex.value]!
	}

	function animateToTarget(
		target: number | undefined,
		duration = SNAP_DURATION,
	) {
		if (!drawerRef.value || target === undefined) return

		const start = getCurrentTranslate()
		const delta = target - start
		const startTime = performance.now()
		cancelAnimationFrame(rafId)

		function step(now: number) {
			if (target === undefined) return

			const p = Math.min(1, (now - startTime) / duration)
			const easedOutCubic = 1 - Math.pow(1 - p, 3)
			const current = start + delta * easedOutCubic

			drawerRef.value!.style.transform = `translateY(${current}px)`
			if (spacerRef.value) {
				spacerRef.value.style.height = `${current}px`
			}

			updateBodyPaddingForTranslate(current)

			if (p < 1) {
				rafId = requestAnimationFrame(step)
			} else {
				const index = nearestIndex(target)
				currentIndex.value = index
				isExpanded.value = index === 0

				drawerRef.value!.style.transform = `translateY(${positions[index]}px)`
				if (spacerRef.value) {
					spacerRef.value.style.height = `${positions[index]}px`
				}

				updateBodyPaddingForTranslate(positions[index]!)
			}
		}

		rafId = requestAnimationFrame(step)
	}

	function nearestIndex(y: number) {
		let best = 0
		let bestDistribution = Infinity

		for (const [index_, pos] of positions.entries()) {
			const d = Math.abs(pos - y)
			if (d < bestDistribution) {
				bestDistribution = d
				best = index_
			}
		}

		return best
	}

	function onPointerDown(event: PointerEvent) {
		if (!drawerRef.value) return
		const target = event.target as HTMLElement
		const drawerElement = drawerRef.value

		const isHandle =
			handleRef.value &&
			(target === handleRef.value || handleRef.value.contains(target))

		const canDragDrawer =
			isExpanded.value &&
			contentRef.value?.scrollTop === 0 &&
			drawerElement.contains(target)

		if (!(isHandle || canDragDrawer)) return
		target.setPointerCapture?.(event.pointerId)

		isDragging.value = true
		startY = event.clientY
		startTranslate = getCurrentTranslate()
		lastMoves = [{ t: performance.now(), y: event.clientY }]

		drawerElement.style.transition = 'none'

		window.addEventListener('pointermove', onPointerMove, { passive: false })
		window.addEventListener('pointerup', onPointerUp)
		window.addEventListener('pointercancel', onPointerCancel)
	}

	function onPointerMove(event: PointerEvent) {
		if (!isDragging.value) return

		event.preventDefault()

		const currentY = event.clientY
		const diff = currentY - startY
		let next = startTranslate + diff

		next = clamp(next, positions[0]!, positions[positions.length - 1]!)
		setTranslate(next, true)

		lastMoves.push({ t: performance.now(), y: currentY })
		const now = performance.now()

		while (lastMoves.length > 0 && now - lastMoves[0]!.t > VELOCITY_WINDOW) {
			lastMoves.shift()
		}
	}

	function computeVelocity() {
		if (lastMoves.length < 2) return 0

		const first = lastMoves[0]!
		const last = lastMoves[lastMoves.length - 1]!

		const dy = last.y - first.y
		const dt = Math.max(1, last.t - first.t)

		return dy / dt
	}

	function snapTo(index: number) {
		const targetIndex = Math.max(0, Math.min(index, positions.length - 1))

		currentIndex.value = targetIndex
		isExpanded.value = targetIndex === 0

		animateToTarget(positions[targetIndex])
	}

	function finishDrag() {
		if (!isDragging.value || !drawerRef.value) return
		isDragging.value = false
		drawerRef.value.style.transition = ''
		window.removeEventListener('pointermove', onPointerMove)
		window.removeEventListener('pointerup', onPointerUp)
		window.removeEventListener('pointercancel', onPointerCancel)

		const velocity = computeVelocity()
		const current = getCurrentTranslate()
		const proj = current + velocity * VELOCITY_FACTOR

		if (Math.abs(velocity) >= MIN_FLICK_VELOCITY) {
			if (velocity > 0) {
				const next = positions.find((p) => p > current)
				if (next !== undefined) {
					animateToTarget(next)
					return
				}
			} else {
				const previous = [...positions].reverse().find((p) => p < current)
				if (previous !== undefined) {
					animateToTarget(previous)
					return
				}
			}
		}

		const projectedTarget = nearestIndex(proj)
		animateToTarget(positions[projectedTarget])
	}

	function onPointerUp() {
		finishDrag()
	}

	function onPointerCancel() {
		finishDrag()
	}

	function handleClick() {
		if (!drawerRef.value) return
		const current = getCurrentTranslate()
		if (Math.abs(current - positions[0]!) < 1) {
			animateToTarget(positions[positions.length - 1])
		} else {
			animateToTarget(positions[0])
		}
	}

	function attach() {
		if (!drawerRef.value) return
		const drawerElement = drawerRef.value

		setTranslate(positions[currentIndex.value]!, true)
		saveAndApplyBodyPaddingInitial()
		isExpanded.value = currentIndex.value === 0

		if (handleRef.value) {
			handleRef.value.addEventListener('pointerdown', onPointerDown)
			handleRef.value.addEventListener('click', handleClick)
		}

		drawerElement.addEventListener('pointerdown', onPointerDown)

		resizeObserver = new ResizeObserver(() => {
			if (isMobile()) {
				updateBodyPaddingForTranslate(getCurrentTranslate())
			} else {
				document.body.style.paddingBottom = originalBodyPadding
			}
		})
		resizeObserver.observe(document.body)
	}

	function detach() {
		if (!drawerRef.value) return

		if (handleRef.value) {
			handleRef.value.removeEventListener('pointerdown', onPointerDown)
			handleRef.value.removeEventListener('click', handleClick)
		}

		drawerRef.value.removeEventListener('pointerdown', onPointerDown)

		window.removeEventListener('pointermove', onPointerMove)
		window.removeEventListener('pointerup', onPointerUp)
		window.removeEventListener('pointercancel', onPointerCancel)

		if (resizeObserver) {
			resizeObserver.disconnect()
			resizeObserver = null
		}

		document.body.style.paddingBottom = originalBodyPadding
		cancelAnimationFrame(rafId)
	}

	onMounted(() => {
		attach()
	})

	onBeforeUnmount(() => {
		detach()
	})

	return {
		attach,
		currentIndex,
		detach,
		isDragging,
		isExpanded,
		positions,
		snapTo,
	}
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

const isMobile = () => !window.matchMedia('(min-width: 640px)').matches
