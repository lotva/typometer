import type { ITokenContext } from '../model'

import { getTokenNameByIndex } from './naming'

export function generateFullTokens(context: ITokenContext) {
	const tokens: Record<string, string> = {}

	context.values.forEach((value, index) => {
		const name = getTokenNameByIndex(index, context)
		const cssVariable = name
			? `--${context.config.prefix}--${name}`
			: `--${context.config.prefix}`
		tokens[cssVariable] = `${value}${context.settings.unit}`
	})

	return tokens
}
