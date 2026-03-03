import type { ISettings, TOutputFormat } from '~/modules/root/model/types'

import type { ITokenContext, ITokens } from '../model'

import { TOKEN_NAMES } from '../config'
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
	const mobileFirst = generateMobileFirstTokens(context)
	const recommended = generateRecommendedTokens(context)

	return { full, mobileFirst, recommended }
}
