export function highlightCalcExpression(expression: string) {
	const tokens: { class?: string; text: string }[] = []
	const length = expression.length

	let i = 0

	while (i < length) {
		const char = expression[i]
		if (!char) break

		if (/\s/.test(char)) {
			tokens.push({ text: char })
			i++
			continue
		}

		if (char === '(' || char === ')' || char === ',') {
			tokens.push({ class: 'token punctuation', text: char })
			i++
			continue
		}

		if (['*', '+', '/'].includes(char)) {
			tokens.push({ class: 'token operator', text: char })
			i++
			continue
		}

		if (/\d/.test(char)) {
			let numberString = ''
			while (i < length && /[\d.]/.test(expression[i]!)) {
				numberString += expression[i]
				i++
			}
			tokens.push({ class: 'token value', text: numberString })
			continue
		}

		if (/[A-Z_a-z-]/.test(char)) {
			let ident = ''
			while (i < length && /[\w-]/.test(expression[i]!)) {
				ident += expression[i]
				i++
			}

			if (
				ident === 'var' ||
				ident === 'calc' ||
				ident === 'pow' ||
				ident === 'clamp'
			) {
				tokens.push({ class: 'token value', text: ident })
			} else if (ident.startsWith('--')) {
				tokens.push({ class: 'token property', text: ident })
			} else {
				tokens.push({ class: 'token unit', text: ident })
			}
			continue
		}

		tokens.push({ text: char })
		i++
	}

	return tokens
		.map((t) =>
			t.class ? `<span class="${t.class}">${t.text}</span>` : t.text,
		)
		.join('')
}

export function highlightMediaQuery(query: string) {
	return query.replace(/(\d*\.?\d+)(px|em|rem)/g, (_, number, unit) => {
		return `<span class="token value">${number}</span><span class="token unit">${unit}</span>`
	})
}

export function highlightValue(value: string) {
	if (isCalcExpression(value)) {
		return highlightCalcExpression(value)
	}

	const unitPattern = /^([+-]?\d*\.?\d+)([%a-z]+)?$/i
	const match = value.trim().match(unitPattern)

	if (match) {
		const number = match[1]
		const unit = match[2] || ''
		return unit
			? `<span class="token value">${number}</span><span class="token unit">${unit}</span>`
			: `<span class="token value">${number}</span>`
	}

	return `<span class="token value">${value}</span>`
}

export function isCalcExpression(value: string) {
	const trimmed = value.trim()

	return ['calc(', 'clamp(', 'var('].some((prefix) =>
		trimmed.startsWith(prefix),
	)
}
