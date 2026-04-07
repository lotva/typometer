import type { ISettings, TOutputFormat } from '~/modules/root/model/types'

import type { ITokenContext, ITokens } from '../model'

import { generateComputedTokens } from './computed'
import { generateFluidTokens } from './fluid'
import { generateStaticTokens } from './static'

export function generateTokens(
	scaleValues: number[],
	outputFormat: TOutputFormat,
	settings: ISettings,
): ITokens {
	const enabledValues = scaleValues.filter(
		(_, index) => !settings.disabledIndices.has(index),
	)

	const context: ITokenContext = {
		outputFormat,
		settings,
		values: enabledValues,
	}

	const staticTokens = generateStaticTokens(context)
	const computedTokens = generateComputedTokens(context)
	const fluidTokens = generateFluidTokens(context)

	return { computed: computedTokens, fluid: fluidTokens, static: staticTokens }
}
