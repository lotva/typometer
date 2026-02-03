import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import SampleComponent from '../../common/ui/SampleComponent.vue'
import IndexPage from './IndexPage.vue'

describe('IndexPage', () => {
	it('works with mountSuspended', async () => {
		const wrapper = await mountSuspended(IndexPage)
		const sampleComponent = wrapper.findComponent(SampleComponent)
		expect(sampleComponent.exists()).toBeTruthy()
	})
})
