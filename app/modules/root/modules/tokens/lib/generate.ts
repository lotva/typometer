import type { ISettings, TOutputFormat } from '~/modules/root/model/types'

import type { ITokenContext, ITokens } from '../model'

import { TOKEN_NAMES } from '../config'
import { generateComputedTokens } from './computed'
import { generateFullTokens } from './full'
import { generateMobileFirstTokens } from './mobile-first'
import { generateRecommendedTokens } from './recommended'

export function generateTokens(
	scaleValues: number[],
	outputFormat: TOutputFormat,
	settings: ISettings,
): ITokens {
	const config = TOKEN_NAMES[outputFormat]
	const enabledValues = scaleValues.filter(
		(_, index) => !settings.disabledIndices.has(index),
	)

	const context: ITokenContext = {
		config,
		outputFormat,
		settings,
		values: enabledValues,
	}

	const full = generateFullTokens(context)
	const recommended = generateRecommendedTokens(context)
	const computed = generateComputedTokens(context)
	const mobileFirst = generateMobileFirstTokens(context)

	return { computed, full, mobileFirst, recommended }
}
