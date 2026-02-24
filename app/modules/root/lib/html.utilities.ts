import type { ITokens } from './tokens.utilities'

export function generateTokenHtml(tokens: ITokens) {
	const sections = [
		...generateFullSection(tokens),
		...generateRecommendedSection(tokens),
		...generateMobileFirstSection(tokens),
	]

	return sections.join('\n')
}

function formatValueWithUnits(value: string) {
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

function generateFullSection(tokens: ITokens) {
	if (Object.keys(tokens.full).length === 0) return []

	return [
		`<span class="token comment">/* Full Scale */</span>`,
		'',
		...generateRootBlock(tokens.full),
	]
}

function generateMobileFirstSection(tokens: ITokens) {
	if (Object.keys(tokens.mobileFirst).length === 0) return []

	return [
		'',
		`<span class="token comment">/* Mobile-first Scale */</span>`,
		`<span class="token comment">/* Base values are set for mobile, then elegantly overridden */</span>`,
		`<span class="token comment">/* at strategic breakpoints using variable reassignment */</span>`,
		`<span class="token comment">/* within media queries. */</span>`,
		'',
		...generateRootBlock(tokens.mobileFirst),
	]
}

function generateRecommendedSection(tokens: ITokens) {
	if (Object.keys(tokens.recommended).length === 0) return []

	return [
		'',
		`<span class="token comment">/* Recommended Scale */</span>`,
		`<span class="token comment">/* A curated selection for most common use cases. */</span>`,
		`<span class="token comment">/* Feel free to mix and match tokens from either scale. */</span>`,
		'',
		...generateRootBlock(tokens.recommended),
	]
}

function generateRootBlock(tokens: Record<string, string>) {
	const lines: string[] = []

	lines.push(
		`<span class="token selector">:root</span> <span class="token brackets">{</span>`,
	)

	Object.entries(tokens).forEach(([key, value]) => {
		const valueHtml = formatValueWithUnits(value)
		lines.push(
			`  <span class="token property">${key}</span><span class="token punctuation">:</span> ${valueHtml}<span class="token semi">;</span>`,
		)
	})

	lines.push(`<span class="token brackets">}</span>`)

	return lines
}
