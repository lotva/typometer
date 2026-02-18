import type { ITokens } from './tokens.utilities'

export function generateCss(tokens: ITokens) {
	const sections = [
		...generateFullScaleSection(tokens),
		...generateRecommendedScaleSection(tokens),
		...generateMobileFirstScaleSection(tokens),
	]

	return sections.join('\n')
}

function generateCssSection(tokens: Record<string, string>) {
	return [
		':root {',
		...Object.entries(tokens).map(([key, value]) => `  ${key}: ${value};`),
		'}',
	]
}

function generateFullScaleSection(tokens: ITokens) {
	if (Object.keys(tokens.full).length === 0) return []

	return [`/* Full Scale */\n`, ...generateCssSection(tokens.full)]
}

function generateMobileFirstScaleSection(tokens: ITokens) {
	if (Object.keys(tokens.mobileFirst).length === 0) return []

	return [
		'\n/* Mobile-first Scale */',
		'/* Base values are set for mobile, then elegantly overridden',
		'   at strategic breakpoints using variable reassignment',
		'   within media queries. */\n',
		...generateCssSection(tokens.mobileFirst),
	]
}

function generateRecommendedScaleSection(tokens: ITokens) {
	if (Object.keys(tokens.recommended).length === 0) return []

	return [
		`\n/* Recommended Scale */`,
		`/* A curated selection for most common use cases.`,
		`   Feel free to mix and match tokens from either`,
		`   scale to fit your needs. */\n`,
		...generateCssSection(tokens.recommended),
	]
}
