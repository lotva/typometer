import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

import IndexPage from './IndexPage.vue'

describe('IndexPage', () => {
	it('works with vitest-browser-vue', () => {
		const { getByText } = render(IndexPage)
		expect(getByText('Sample Component')).toBeInTheDocument()
	})
})
