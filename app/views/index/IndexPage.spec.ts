import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import IndexPage from './IndexPage.vue'

describe('IndexPage', () => {
	it('works with mountSuspended', async () => {
		const wrapper = await mountSuspended(IndexPage)
		expect(wrapper.exists()).toBeTruthy()
	})
})
